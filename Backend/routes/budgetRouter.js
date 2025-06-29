import express from 'express';
import { createBudget, deleteBudget, getAll, updateBudget } from '../controller/budgetContoller.js';
import { AuthenticateUser } from '../middleware/auth.js';

export const budgetRouter = express.Router();

budgetRouter.post('/add',AuthenticateUser,createBudget);

budgetRouter.get('/getAll',AuthenticateUser,getAll);

budgetRouter.put('/update/:id',AuthenticateUser,updateBudget);

budgetRouter.delete('/delete/:id',AuthenticateUser,deleteBudget)