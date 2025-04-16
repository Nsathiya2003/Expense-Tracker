import { deleteUploadedFile, generateAccessToken } from "../middleware/auth.js";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';

export const createUser = async (req, res) => {
  const user_profile = req.file;

  try {
    const { firstname, lastname, mobileNo, email } = req.body;
    const password = req.header('password');

    if (!password) throw new Error("Password header is missing");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const addUser = await User.create({
      firstname,
      lastname,
      mobileNo,
      emailId: email,
      password: hashedPassword,
      user_profile: user_profile?.filename || null
    });

    const { password: _, ...safeUserData } = addUser.dataValues ?? addUser.toJSON();

    return res.status(200).json({
      status: true,
      data: safeUserData,
      message: "Your registration was successful"
    });

  } catch (error) {
    await deleteUploadedFile(user_profile);
    console.error(error);
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};




export const userLogin = async (req,res) =>{
    try{
      const authHeader = req.headers['Authoraization'];
      const [email,password] = extractBasicAuthHeaders(authHeader);
      const verifyUser = await User.findOne({ where : { emailId: email}});
      if(!await bcrypt.compare(password,verifyUser.password)){
        return res.status(400).json({
            status:false,
            message:"password does not match",
            error
        });
      }
      const payload = {
        user : {
            id: verifyUser.id,
            role:'user'
        }
      };
      const accessToken = generateAccessToken(payload);
      console.log("----accessToken----",accessToken);
      let data ={};
      const findUser = await User.findOne({ where: { emailId : email}, attributes: { exclude : ['password']}});
      console.log("---findUser--",findUser);
      data['user'] = company;
      data['accessToken'] = accessToken;
      res.status(200).json({
        success: true,
        message: "Login success",
        data
      });    
    }
    catch(error){
        
    }
}