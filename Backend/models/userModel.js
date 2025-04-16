import { DataTypes } from "sequelize";
import  sequelize  from "../config/db.js";

 const User = sequelize.define('User',{

  firstname:{
    type:DataTypes.STRING,
    allowNull:false
  },
  lastname:{
    type:DataTypes.STRING,
    allowNull:false
  },
  mobileNo:{
    type:DataTypes.STRING,
    allowNull:false
  },
  emailId:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true
  },
  password :{
    type:DataTypes.STRING,
    allowNull:false
  },
  user_profile:{
    type:DataTypes.TEXT,
    allowNull:false
  },
},
  {
    timestamps:true
  }
)
export default User;