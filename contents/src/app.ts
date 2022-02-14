import {errorHandler, NotFoundError, currentUser} from '@storybooks/common-service'
import {json} from 'body-parser';
// this package resolves async errors.
import 'express-async-errors';  

import cookieSession from 'cookie-session';
import express from 'express';

import { createContentRouter } from './routes/newcontent';
import { getAllContentsRouter } from './routes/getcontents';
import { getSingleContentRouter } from './routes/getsinglecontent';
import { updateContentLikesRouter } from './routes/updatecontentlikes';

const app = express();
app.set('trust proxy', true);   // trust ingress proxy
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: true,
    })
);

app.use(currentUser);

app.use(createContentRouter);
app.use(getAllContentsRouter);
app.use(getSingleContentRouter);
app.use(updateContentLikesRouter);

app.all('*', async () => {
    throw new NotFoundError();
})

app.use(errorHandler);

export { app };