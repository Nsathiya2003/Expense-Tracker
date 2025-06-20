import express from 'express';
import { createBudget, deleteBudget, getAll, updateBudget } from '../controller/budgetContoller.js';

export const budgetRouter = express.Router();

budgetRouter.post('/add',createBudget);

budgetRouter.get('/getAll',getAll);

budgetRouter.put('/update/:id',updateBudget);

budgetRouter.delete('/delete/:id',deleteBudget)