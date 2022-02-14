import {requireAuth, validateRequest} from '@storybooks/common-service'
import express, {Request, Response} from 'express';
import { body } from 'express-validator'

import {Content} from "../models/contents";

const router = express.Router();

router.post('/api/contents', requireAuth, [
    body('title')
        .not()
        .isEmpty()
        .withMessage('Title must not be empty!'),
    body('content')
        .not()
        .isEmpty()
        .withMessage('Content must not be empty!')
], validateRequest, async(req: Request, res: Response) => {
    const {title, content} = req.body;

    const newContent = Content.build({ 
        title,
        content,
        userId: req.currentUser!.id,
        likes: 0,
        createdAt: Date.now()
    })
    await newContent.save();

    res.status(201).send(newContent);
});

export {router as createContentRouter};