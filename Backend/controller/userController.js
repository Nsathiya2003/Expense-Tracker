import { deleteUploadedFile, generateAccessToken, generateRefreshToken } from "../middleware/auth.js";
import { sendError, sendSuccess } from "../middleware/helper.js";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';

  //All logic's for user

  export const createUser = async (req, res) => {
    const user_profile = req.file;

    try {
      const { firstname, lastname, mobileNo, emailId } = req.body;
      const password = req.header('password');

      if (!password) throw new Error("Password header is missing");

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const addUser = await User.create({
        firstname,
        lastname,
        mobileNo,
        emailId,
        password: hashedPassword,
        user_profile: user_profile?.filename || null
      });

      const { password: _, ...safeUserData } = addUser.dataValues ?? addUser.toJSON();

      return sendSuccess(res,'User created Successfull',safeUserData,201);

    } 
    catch (error) {
      await deleteUploadedFile(user_profile);
      return sendError(res,'Failed to create User',error.message);
    }
  };

  export const userLogin = async (req, res) => { 
    try {
      const { email } = req.body;
      const password = req.header('password');

      const verifyUser = await User.findOne({ where: { emailId: email } });
      if (!verifyUser) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        }); 
      }
      const isMatch = await bcrypt.compare(password, verifyUser.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Password does not match"
        });
      }

      const payload = {
        user: {
          id: verifyUser.id,
          role: 'user'
        }
      };
      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);
      // console.log("----accessToken----", accessToken);
      // console.log("----refreshToken----", refreshToken);

      const findUser = await User.findOne({
        where: { emailId: email },
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
        message: "Login success",
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
      console.log("---user---",user);

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
 