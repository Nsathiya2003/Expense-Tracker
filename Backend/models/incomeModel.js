import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

// const {amount,category,source,description,date,proof} = req.body;

 const Income = sequelize.define('Income',{
    amount:{
        type:DataTypes.STRING,
        allowNull:false
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    source:{
        type:DataTypes.STRING,
        allowNull:true
    },
    description:{
        type:DataTypes.STRING,
        allowNull:true
    },
    proof:{
        type:DataTypes.TEXT,
        allowNull:true
    }

});

export default Income;