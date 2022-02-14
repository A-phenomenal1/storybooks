import {errorHandler, NotFoundError} from '@storybooks/common-service'
import {json} from 'body-parser';
// this package resolves async errors.
import 'express-async-errors';  

import cookieSession from 'cookie-session';
import express from 'express';

//current-user
import {currentUserRouter} from './routes/current-user'
//get-user
import {getUserRouter} from './routes/get-user';
//signin
import {signinRouter} from './routes/signin'
//signout
import {signoutRouter} from './routes/signout'
//signup
import {signupRouter} from './routes/signup'

const app = express();
app.set('trust proxy', true);   // trust ingress proxy
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: true,
    })
);

app.use(currentUserRouter);
app.use(getUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async () => {
    throw new NotFoundError();
})

app.use(errorHandler);

export { app };