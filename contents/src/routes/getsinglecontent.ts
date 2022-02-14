import { NotFoundError, requireAuth } from '@storybooks/common-service';
import express, {Request, Response} from 'express';
import { Content } from '../models/contents'

const router = express.Router();

router.get('/api/contents/:id',requireAuth, async (req: Request, res: Response) => {
    let content = await Content.findById(req.params.id);
    if(!content){
        throw new NotFoundError();
    }
    res.status(200).send(content);
})

export {router as getSingleContentRouter}