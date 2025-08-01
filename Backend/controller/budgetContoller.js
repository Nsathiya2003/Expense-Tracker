import { model } from "mongoose";
import { sendError, sendSuccess } from "../middleware/helper.js";
import { Budget } from "../models/budgetModel.js";
import { Category } from "../models/categoryModel.js";

    export const createBudget = async(req,res) =>{
        const user_id = req.user.id;
        try{
        const { month,amount,category_id,date} = req.body;
        console.log("req.body----",req.body);
        const budget = await Budget.create({
            month:month,
            amount:amount,
            date:date,
            category_id:category_id,
            remaining:amount,
            spent:0,
            user_id
        })
        console.log("budget",budget);
        return sendSuccess(res,'Budget created successfully',budget,201)
        }
        catch(err){
            return sendError(res,'Failed to create budget',err.message)
        }
    }

    export const getAll = async (req,res) => {
            const id = req.user.id;
        try{
            const budget = await Budget.findAll({
                where : { status:"ACTIVE",user_id:id },
                include : [{ model: Category, as:'category'}]
            });
            return sendSuccess(res,'Data retrived successfully',budget)
        }
        catch(error){
            return sendError(res,'Failed to fetch data',error.message)
        }
    }

    export const updateBudget = async (req,res) =>{
        try{
            const { month,amount,category_id,date} = req.body;
            const budget_id = req.params.id;
            const user_id = req.user.id;

            const budget = await Budget.findOne({
                where : { id: budget_id, user_id: user_id}
            })
            if(!budget){
                return sendSuccess(res,'No budget found',null,404)
            }
            budget.month = month,
            budget.amount = amount,
            budget.category_id = category_id,
            budget.date = date,
            budget.user_id = user_id
            await budget.save();

            return sendSuccess(res,'Budget updated successfully',budget)
        }
        catch(error){
            return sendError(res,'Failed to update budget',error)
        }
    }
  export const getById = async (req,res) =>{
        const id = req.params.id;
        try{
            const budget = await Budget.findOne({ where : {id:id}});
            if(!budget){
            return sendError(res,'Data not found',null,404)
            }
            return sendSuccess(res,'data retrived successfully',budget)
        }
        catch(error){
            return sendError(res,'Failed to fetch data',error.message);
        }
    }
    export const deleteBudget = async(req,res) =>{
        const budget_id = req.params.id;
        try{
            const budget = await Budget.findOne ({where : { id: budget_id}});
            if(!budget){
                return sendError(res,'Budget not found',null,404);
            }
             const deleted = await budget.destroy(budget_id);
             console.log("deleted----",deleted);

            // budget.status = 'DELETE';
            await budget.save();

            return sendSuccess(res,'Budget deleted successful',budget)
        }
        catch(error){
            return sendError(res,'Failed to delete budget',error.message)
        }
    }