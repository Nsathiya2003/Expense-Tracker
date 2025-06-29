import express from 'express';
import { addExpense, deleteExpense, getAll, getById, updateExpense } from '../controller/expenseController.js';
import { AuthenticateUser, uploadIncomeProof } from '../middleware/auth.js';

export const expenseRouter = express.Router();

expenseRouter.post('/add',uploadIncomeProof.single('proof'),AuthenticateUser,addExpense)

expenseRouter.get('/getAll',AuthenticateUser,getAll)

expenseRouter.get('/getById/:id',AuthenticateUser,getById)

expenseRouter.put('/update/:id',uploadIncomeProof.single('proof'),AuthenticateUser,updateExpense)

expenseRouter.delete('/delete/:id',AuthenticateUser,deleteExpense)