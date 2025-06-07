import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { Category } from "./categoryModel.js";

export const Expense = sequelize.define('Expense',{
    amount:{
        type:DataTypes.STRING,
        allowNull:false
    },
    category_id:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:true
    },
    paymentMethod:{
        type:DataTypes.STRING,
        allowNull:false
    },
    proof:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    status: {
    type:DataTypes.STRING,
    defaultValue:'ACTIVE'
  }

});

Category.hasMany(Expense, {foreignKey: 'category_id', as: 'expense'})
Expense.belongsTo(Category, {foreignKey: 'category_id', as: 'category'})
// export default Expense;