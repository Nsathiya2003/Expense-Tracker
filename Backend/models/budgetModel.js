import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { Category } from "./categoryModel.js";

export const Budget = sequelize.define('Budget', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    month:{
        type:DataTypes.STRING,
        allowNull:false
    },
    date:{
        type:DataTypes.STRING,
        allowNull:false
    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    remaining:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    spent:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    category_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        defaultValue:"ACTIVE"
    }
})

Category.hasMany(Budget,{ foreignKey : 'category_id',as:'budget'})
Budget.belongsTo(Category, { foreignKey: 'category_id', as:'category'})

