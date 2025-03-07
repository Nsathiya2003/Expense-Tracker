import User from "../models/userModel.js";


export const createUser = async(req,res) =>{
    try{
        const {firstname,lastname,mobileNo,email} = req.body;
        const password = req.header('password');
        console.log("---password---",password);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.compare(password,salt);

        console.log("---hashedPassword---",hashedPassword);

        const addUser = await User.create({
            firstname,
            lastname,
            mobileNo,  
            emailId:email,
            password:hashedPassword
        });

        return res.status(200).json({status: true, data:addUser, message:"Your registration successfuly"})
        }

    catch(error){ 
        console.error(error);
        return res.status(500).json({status: false, message: 'Internal Server Error', error});
    } 
    
} 

export const userLogin = async (req,res) =>{
    try{
      const authHeader = req.headers['Authoraization'];
      const [email,password] = extractBasicAuthHeaders(authHeader);
      const verifyUser = await User.findOne({ where : { emailId: email}});
      if(!await bcrypt.compare(password,verifyUser.password)){
        console.log("password does not match")
      }
    }
    catch(error){
        
    }
}