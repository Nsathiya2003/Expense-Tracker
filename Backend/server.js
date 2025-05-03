import express from 'express';
import morgan from 'morgan'; 
import cors from 'cors'; 
import bodyParser from 'body-parser'; 
import dotenv from 'dotenv'; 
import  {userRouter}  from './routes/userRouter.js';
import helmet from 'helmet';
import { incomeRouter } from './routes/incomeRouter.js';

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

app.use(helmet()); 
app.use(morgan('combined')); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// For JSON body parsing
// app.use(express.json());

// // ✅ For form data (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

app.use('/api/user',userRouter);
app.use('/api/income',incomeRouter)




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 
