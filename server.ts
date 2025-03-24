import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { errorHandler } from './_middleware/error-handler';
import usersController from './users/users.controller';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/users', usersController);

// Ensure the error handler is placed AFTER all routes
app.use((err: any, req: Request, res: Response, next: NextFunction) => errorHandler(err, req, res, next));

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));
