import express from 'express';
import { createCategory, deleteCategory, getAll, getById, updateCategory } from '../controller/categoryController.js';
import { AuthenticateUser } from '../middleware/auth.js';

export const categoryRouter = express.Router()

categoryRouter.post('/add',AuthenticateUser,createCategory)

categoryRouter.get('/getAll',AuthenticateUser,getAll)

categoryRouter.get('/getById/:id',AuthenticateUser,getById)

categoryRouter.put('/update/:id',AuthenticateUser,updateCategory)

categoryRouter.delete('/delete/:id',AuthenticateUser,deleteCategory)