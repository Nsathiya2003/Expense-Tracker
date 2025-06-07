import express from 'express';
import { addIncome, deleteIncome, getAll, updateIncome } from '../controller/incomeController.js';
import { uploadIncomeProof } from '../middleware/auth.js';

export const incomeRouter = express.Router();

incomeRouter.post('/add',uploadIncomeProof.single('proof'),addIncome);

incomeRouter.get('/getAll',getAll);

incomeRouter.put('/update/:id',uploadIncomeProof.single('proof'),updateIncome)

incomeRouter.delete('/delete/:id',deleteIncome)