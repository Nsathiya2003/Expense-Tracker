import { deleteUploadedFile, generateAccessToken, generateRefreshToken } from "../middleware/auth.js";
import { alreadyExists, sendError, sendSuccess } from "../middleware/helper.js";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';

  //All logic's for user

  export const createUser = async (req, res) => {
    const user_profile = req.file;

    try {
      const { username, mobileNo, emailId,password } = req.body;
      // const password = req.header('password');
      console.log("req.body data is---",req.body);
      const salt = await bcrypt.genSalt(10);
      console.log("username---",username);
      console.log("mobile---",mobileNo);
      console.log("email---",emailId);
      console.log("password---",password);

      console.log("salt---",user_profile);


      const hashedPassword = await bcrypt.hash(password, salt);

          console.log("hashedPassword---",hashedPassword);

      const findUser = await User.findOne({
        where: { emailId: emailId}
      })
      if(findUser) {
          return alreadyExists(res,'Email id');
      }
      const addUser = await User.create({
        username,
        mobileNo,
        emailId,
        password: hashedPassword,
        user_profile: user_profile?.filename || null
      });
      console.log("adduser",addUser);

      const { password: _, ...safeUserData } = addUser.dataValues ?? addUser.toJSON();

      return sendSuccess(res,'Account Created Successfully',safeUserData,201);

    } 
    catch (error) {
      await deleteUploadedFile(user_profile);
      console.log("error.message",error.message);
      return sendError(res,'Failed to create User',error.message);
    }
  };

  export const userLogin = async (req, res) => { 
    try {
      const { emailId,password } = req.body;
      // const password = req.header('password');
      console.log("body is",req.body);
      console.log("EmailId iss",emailId);
      const verifyUser = await User.findOne({ where: { emailId: emailId } });
      console.log("verifyUser--",verifyUser);
      if (!verifyUser) {
        return sendError(res,"User not found",null,404)
      }
      const isMatch = await bcrypt.compare(password, verifyUser.password);
      if (!isMatch) {
        return sendError(res,"Password does not match",null,404)

      }

      const payload = {
          id: verifyUser.id,
          role: 'user'
        
      };
      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);
      // console.log("----accessToken----", accessToken);
      // console.log("----refreshToken----", refreshToken);

      const findUser = await User.findOne({
        where: { emailId: emailId },
        attributes:  { exclude:"password"}
      });
      console.log("findUser----",findUser);

      const data = {
        user: findUser,
        accessToken,
        refreshToken
      };

      res.status(200).json({
        success: true, 
        message: "Your account logged in successfully",
        data
      });

    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message
      });
    }
  };

  export const updateUser = async (req,res) => {
    const user_profile = req.file;
    const user_id = req.params.id;

    try{
      const {firstname, lastname, mobileNo, emailId } = req.body;
    
      if(!user_id){
        throw new Error ('User id is required')
      }

      const password = req.header('password');
      if (!password) throw new Error("Password header is missing");

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const user = await User.findOne({ where: {id:user_id}});
        if(!user){
          return sendError(res,'User data not found',null,404)
        }

      user.firstname = firstname,
      user.lastname = lastname,
      user.mobileNo = mobileNo,
      user.emailId = emailId,
      user.password = hashedPassword,
      user.user_profile = user_profile?.filename || null

      await user.save();
      return sendSuccess(res,'User updation Successfull',safeUserData);

      }
    catch(error){
         return sendError(res,'Failed to update User',error,);

    }
  }

  export const getById = async (req,res) => {
    const id = req.params.id;
    try{ 
     const user = await User.findOne({ where : { id: id}});
      if(!user){
      return sendError(res,'User not found',null,404);
      }
      return sendSuccess(res,'User retrived successfully',user);
    }
    catch(error){
      return sendError(res,'Failed to fetch user',error.message)
    }
  }
 