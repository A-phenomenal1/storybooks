import {NotFoundError, requireAuth, validateRequest} from '@storybooks/common-service'
import express, {Request, Response} from 'express';
import { body } from 'express-validator'

import { ContentUpdatedPublisher } from '../events/publishers/content-updated-publisher'
import { natsWrapper } from '../nats-wrapper';
import {Content} from "../models/contents";

const router = express.Router();

router.patch('/api/contents/:id', requireAuth, [
    body('likestatus')
        .not()
        .isEmpty()
        .withMessage('Something went wrong')
], validateRequest, async(req: Request, res: Response) => {
    const {likestatus} = req.body;

    let content = await Content.findById(req.params.id);

    if(!content) {
        throw new NotFoundError();
    }

    content.set({
        likes: likestatus?content.likes+1:content.likes-1,
    });
    await content.save();

    res.status(200).send(content);
    new ContentUpdatedPublisher(natsWrapper.client).publish({
        id: content.id,
        userId: content.userId,
        likestatus,
    })
});

export {router as updateContentLikesRouter};