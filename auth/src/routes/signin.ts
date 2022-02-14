import {validateRequest, BadRequestError} from "@storybooks/common-service";
import express, {Request, Response} from 'express'
import {body} from 'express-validator'
import jwt from 'jsonwebtoken';

import { Password } from '../services/password';
import { User } from "../models/user";

const router = express.Router();

router.post('/api/users/signin',
[
    body('email')
    .isEmail()
    .withMessage('Email must be valid!'),
    body('password').trim().notEmpty().withMessage('You must supply a password!')
], validateRequest, async(req: Request, res: Response) => {
    const {email, password} = req.body;

    const isUserExist = await User.findOne({email});
    if(!isUserExist){
        throw new BadRequestError('User not exist! Go to signup.');
    }

    const isPasswordMatch = Password.compare(password, isUserExist.password )
    if(!isPasswordMatch){
        throw new BadRequestError('Wrong Username or Password')
    }

     // Generate JWT
     const userJwt = jwt.sign({
        id: isUserExist.id,
        email: isUserExist.email
    }, process.env.JWT_KEY!);       
    //! sign tells typescript that 'process.env.JWT_KEY never gonna undefined
    // we checked it early.

    // Store it on session object
    req.session = {
        jwt: userJwt
    };

    res.status(201).send(isUserExist)

});

export {router as signinRouter};