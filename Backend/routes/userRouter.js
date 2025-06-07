import express from 'express';
import { createUser, updateUser, userLogin } from '../controller/userController.js';
import { uploadUserProfile } from '../middleware/auth.js';

export const userRouter = express.Router();


userRouter.post('/addUser',uploadUserProfile.single('user_profile'),createUser);

userRouter.put('/update/:id',uploadUserProfile.single('user_profile'),updateUser)

userRouter.post('/login',userLogin);


   