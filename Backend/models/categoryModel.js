import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const Category = sequelize.define('Category',{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    }

})