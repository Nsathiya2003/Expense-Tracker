import express from 'express';
import { createUser } from '../controller/userController.js';

export const userRouter = express.Router();


userRouter.post('/addUser',createUser);

userRouter.post('/login',)
