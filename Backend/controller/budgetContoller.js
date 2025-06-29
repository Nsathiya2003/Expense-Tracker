import { model } from "mongoose";
import { sendError, sendSuccess } from "../middleware/helper.js";
import { Budget } from "../models/budgetModel.js";
import { Category } from "../models/categoryModel.js";

    export const createBudget = async(req,res) =>{
        const user_id = req.user.id;
        try{
        const { month,amount,category_id,date} = req.body;
        const budget = await Budget.create({
            month:month,
            amount:amount,
            date:date,
            category_id:category_id,
            remaining:amount,
            spent:0,
            user_id
        })
        return sendSuccess(res,'Budget created successfully',budget,201)
        }
        catch(err){
            return sendError(res,'Failed to create budget',err.message)
        }
    }

    export const getAll = async (req,res) => {
        try{
            const budget = await Budget.findAll({
                where : { status:"ACTIVE"},
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
            const { month,amount,category_id,date ,user_id} = req.body;
            const budget_id = req.params.id;

            const budget = await Budget.findOne({
                where : { id: budget_id}
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

    export const deleteBudget = async(req,res) =>{
        const budget_id = req.params.id;
        try{
            const budget = await Budget.findOne ({where : { id: budget_id}});
            if(!budget){
                return sendError(res,'Budget not found',null,404);
            }
            budget.status = 'DELETE';
            await budget.save();

            return sendSuccess(res,'Budget deleted successful',budget)
        }
        catch(error){
            return sendError(res,'Failed to delete budget',error.message)
        }
    }