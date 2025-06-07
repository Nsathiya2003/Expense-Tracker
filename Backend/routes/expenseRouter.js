import express from 'express';
import { addExpense, deleteExpense, getAll, updateExpense } from '../controller/expenseController.js';
import { uploadIncomeProof } from '../middleware/auth.js';

export const expenseRouter = express.Router();

expenseRouter.post('/add',uploadIncomeProof.single('proof'),addExpense);

expenseRouter.get('/getAll',getAll);

expenseRouter.put('/update/:id',uploadIncomeProof.single('proof'),updateExpense);

expenseRouter.delete('/delete/:id',deleteExpense)