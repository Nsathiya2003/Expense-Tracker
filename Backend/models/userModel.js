import { DataTypes } from "sequelize";
import  sequelize  from "../config/db.js";

 const User = sequelize.define('User',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
  username:{
    type:DataTypes.STRING,
    allowNull:false
  },
  // lastname:{
  //   type:DataTypes.STRING,
  //   allowNull:true
  // },
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
    allowNull:true
  },
 
},
  {
    timestamps:true,
    indexes:[
      {
        unique:true,
        fields:["emailId","mobileNo"]
      }
    ]
  }
)
export default User;