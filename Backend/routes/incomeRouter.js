import express from 'express';
import { addIncome, deleteIncome, getAll, getById, updateIncome } from '../controller/incomeController.js';
import { AuthenticateUser, uploadIncomeProof } from '../middleware/auth.js';

export const incomeRouter = express.Router();

incomeRouter.post('/add',uploadIncomeProof.single('proof'),AuthenticateUser, addIncome)

incomeRouter.get('/getAll',AuthenticateUser,getAll)

incomeRouter.get('/getById/:id',AuthenticateUser,getById)

incomeRouter.put('/update/:id',AuthenticateUser,uploadIncomeProof.single('proof'),updateIncome)

incomeRouter.delete('/delete/:id',AuthenticateUser,deleteIncome)