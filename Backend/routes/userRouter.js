import express from 'express';
import { createUser, userLogin } from '../controller/userController.js';
import { uploadUserProfile } from '../middleware/auth.js';

export const userRouter = express.Router();


userRouter.post('/addUser',uploadUserProfile.single('user_profile'),createUser);

userRouter.post('/login',userLogin);


   