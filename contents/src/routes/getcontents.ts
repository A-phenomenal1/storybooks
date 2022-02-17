import { requireAuth } from '@storybooks/common-service';
import express, {Request, Response} from 'express';
import { Content } from '../models/contents'

const router = express.Router();

router.get('/api/contents',requireAuth, async (req: Request, res: Response) => {
    let allContents = await Content.find({}).sort({"likes": -1}).exec();
    res.status(200).send(allContents)
})

export {router as getAllContentsRouter}