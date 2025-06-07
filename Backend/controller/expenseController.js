import { formatedDate } from "../middleware/helper.js";
import { Category } from "../models/categoryModel.js";
import { Expense } from "../models/expenseModel.js";

    export const addExpense = async(req,res) =>{
        try{
        const {amount,category_id,date,description,paymentMethod} = req.body;
        const proof = req.file;
            
        const returnedDate = formatedDate(date);
        console.log("returnedDate----",returnedDate);

        const data = await Expense.create({
            amount,
            category_id,
            date:returnedDate,
            description,
            paymentMethod,
            proof:proof?.filename || null
        });
        res.status(201).json({ message : "Your expense added successfully",data})
        console.log("data---",data)
        }
        catch(error){
            console.log("error",error);
            res.status(500).json({error:"Internal server error"});
        }
        
    }

    export const getAll = async(req,res) =>{
        try{
            const getData = await Expense.findAll({
                 where : { status:'ACTIVE' },
                 include:[
                   { 
                    model: Category,
                    as:'category',
                    // attributes: []
                }

                 ]
                });
            return res.json({
                status:true,
                message:'Data retrived successfully ',
                data:getData
            })
        }
        catch(error){
            res.status(500).json({
                status:false,
                message:`Internal server error ${error.message}`

            })
        }
    }

    export const updateExpense = async (req, res) => {
    const income_id = req.params.id;

    try {
    const proof = req.file?.filename || null; 
    const { amount, category_id, date, description, paymentMethod } = req.body;
    const returnedDate = formatedDate(date); 
    const data = await Expense.findOne({ where: { id: income_id } });
    if (!data) {
      return res.status(404).json({ status: false, message: 'Income record not found' });
    }
    data.amount = amount;
    data.category_id = category_id;
    data.date = returnedDate;
    data.description = description;
    data.paymentMethod = paymentMethod;
    data.proof = proof || data.proof;

    await data.save();

    return res.status(200).json({
      status: true,
      message: 'Income updated successfully',
      data,
    });

  } catch (error) {
    console.error("Error updating income:", error);
    return res.status(500).json({ status: false, message: 'Server error. Could not update income.' });
  }
    }

    export const deleteExpense = async (req,res) =>{
        const expense_id = req.params.id;
        try{
            const softDelete = await Expense.findOne({ where: {id:expense_id}});
            softDelete.status = 'DELETE';
            await softDelete.save();

            return res.status(200).json({
                status:true,
                message:'Data deleted successfull',
                data:softDelete
            })
        }
        catch(error){
        res.status(200).json({
                status:true,
                message:'Internal server error'
            })
        }
    }
