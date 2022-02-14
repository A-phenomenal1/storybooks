import {validateRequest, BadRequestError} from "@storybooks/common-service";
import express, {Request, Response} from 'express'
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,}$/, "i")
        .withMessage("Password format is not valid.")
], validateRequest, async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if(existingUser){
        throw new BadRequestError('Email is in use.')
    }

    const user = User.build({email, password});
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!);       
    //! sign tells typescript that 'process.env.JWT_KEY never gonna undefined
    // we checked it early.

    // Store it on session object
    req.session = {
        jwt: userJwt
    };

    res.status(201).send(user)
});

export {router as signupRouter};