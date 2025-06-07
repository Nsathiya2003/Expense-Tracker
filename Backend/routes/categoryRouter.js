import express from 'express';
import { createCategory, getAll } from '../controller/categoryController.js';

export const categoryRouter = express.Router();

categoryRouter.post('/add',createCategory);

categoryRouter.get('/getAll',getAll);

categoryRouter.put('/api/update/:id',updateCategory)

// categoryRouter.