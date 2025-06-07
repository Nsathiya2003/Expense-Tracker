import jwt from 'jsonwebtoken'
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';


//for javascript

const extractBasicAuthHeaders = (header) => {
    if (header && header.startsWith('Basic ')) {
        // Extract the Base64 encoded part (removing the 'Basic ' prefix)
        const base64Credentials = header.split(' ')[1];
        
        // Decode the Base64 string to get 'email:password'
        const credentials = atob(base64Credentials); // Using atob instead of base64.decode
        
        // Split the 'email:password' string by ':' to get email and password
        const [email, password] = credentials.split(':');
        
        // Return the extracted email and password as an array
        return [email, password];
    }
}


// Buffer decode method for node.js

// const extractBasicAuthHeaders = (header) => {
//     if (header && header.startsWith('Basic ')) {
//         // Extract the Base64 encoded part (removing the 'Basic ' prefix)
//         const base64Credentials = header.split(' ')[1];
        
//         // Decode the Base64 string to get 'email:password'
//         const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
        
//         // Split the 'email:password' string by ':' to get email and password
//         const [email, password] = credentials.split(':');
        
//         // Return the extracted email and password as an array
//         return [email, password];
//     }
// }

export const generateAccessToken = (payload) =>{
    return jwt.sign(payload,process.env.SECRET_KEY_ACCESS_TOKEN , { expiresIn : process.env.ACCESS_TOKEN_EXPIRY})
}
export const generateRefreshToken = (payload) =>{
    return jwt.sign(payload,process.env.SECRET_KEY_REFRESH_TOKEN , { expiresIn : process.env.REFRESH_TOKEN_EXPIRY})
}
//Multer configuration 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userProfile = multer.diskStorage({
    destination: (req,file,callback) =>{
        const uploadPath = path.join(__dirname, "..", "uploads","users");
        callback(null, uploadPath);   
    },
    filename: (req, file, callback) => {
        callback(null, (`${Date.now()}-${file.originalname}`))
    }
});

const incomeProof = multer.diskStorage({
  destination: (req,file,callback) =>{
    const uploadPath = path.join(__dirname,"..","uploads","proof");
    callback(null,uploadPath);
  },
  filename:(req,file,callback) =>{
    callback(null, (`${Date.now()}-${file.originalname}`))
  }
})

export const uploadUserProfile = multer({ storage: userProfile});
export const uploadIncomeProof = multer({ storage: incomeProof});


export const deleteUploadedFile = async (file) => {
  if (file) {
    try {
      await fs.unlink(file.path);
    } catch (err) {
      console.error("Error deleting file:", err);
    }
  }
};