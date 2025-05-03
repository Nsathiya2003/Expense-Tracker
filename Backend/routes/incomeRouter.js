import express from 'express';
import { addIncome, getAll } from '../controller/incomeController.js';
import { uploadIncomeProof } from '../middleware/auth.js';

export const incomeRouter = express.Router();

incomeRouter.post('/addIncome',uploadIncomeProof.single('proof'),addIncome);

incomeRouter.get('/getAll',getAll)