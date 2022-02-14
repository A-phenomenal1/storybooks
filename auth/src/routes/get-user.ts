import { NotFoundError } from '@storybooks/common-service';
import express, { Request, Response } from 'express'

import { User } from '../models/user';

const router = express.Router();

router.get('/api/users/:id', async(req: Request, res: Response) => {
    let user = await User.findById(req.params.id);
    if(!user){
        throw new NotFoundError();
    }
    res.status(200).send(user);
});

export {router as getUserRouter}