import express from 'express';
import morgan from 'morgan'; 
import cors from 'cors'; 
import bodyParser from 'body-parser'; 
import dotenv from 'dotenv'; 
import  {userRouter}  from './routes/userRouter.js';
import helmet from 'helmet';
import User from './models/userModel.js';

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

app.use(helmet()); 
app.use(morgan('combined')); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/user',userRouter)



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
