import express from 'express';
import bodyParser from 'body-parser'; 
import dotenv from 'dotenv'; 
import { userRouter } from './routes/userRouter.js';
import { incomeRouter } from './routes/incomeRouter.js';
import { expenseRouter } from './routes/expenseRouter.js';
import { categoryRouter } from './routes/categoryRouter.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware for JSON body
app.use(bodyParser.json());

// Middleware for URL-encoded data (supports multipart form data)
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/user', userRouter);
// for manage
app.use('/api/income', incomeRouter);
app.use('/api/expense', expenseRouter);
//master
app.use('/api/master/category',categoryRouter)


//  middleware for unmatched routes (404 logger)
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  console.log(`Request Method: ${req.method}`);
  res.status(404).json({ message: 'Route not found' });
  next();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
