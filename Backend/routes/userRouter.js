import express from 'express';
import { createUser, getById, updateUser, userLogin } from '../controller/userController.js';
import { uploadUserProfile } from '../middleware/auth.js';
import path from 'path';
import fs from 'fs';

export const userRouter = express.Router();


userRouter.post('/addUser',uploadUserProfile.single('user_profile'),createUser)

userRouter.get('/getById/:id',getById)

userRouter.put('/update/:id',uploadUserProfile.single('user_profile'),updateUser)

userRouter.post('/login',userLogin)


userRouter.get('/get-images/:folderName/:refId',(req,res) =>{
    const { folderName,refId} = req.params;
    console.log("folderName---",folderName);
    const allowedFolders = ['proof','users'];//allow te visible folder
    if(!allowedFolders.includes(folderName)){
        return res.status(400).json({ error: 'Invalid folder name'})
    }
    const folderPath = path.join(process.cwd(),'uploads',folderName);
    fs.readdir(folderPath,(err,file) =>{
        if(err){
            return res.status(500).json({ error: 'Error reading directory'});
        }
        const matchedFiles = file.filter(file => file.includes(refId));
        console.log("matchedFiles----",matchedFiles)
        res.json(matchedFiles)
    })
})



   