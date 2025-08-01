import { formatedDate, sendError, sendSuccess } from "../middleware/helper.js";
import { Budget } from "../models/budgetModel.js";
import { Category } from "../models/categoryModel.js";
import { Expense } from "../models/expenseModel.js";

   export const addExpense = async (req, res) => {
  const proof = req.file;
  const user_id = req.user?.id;

  try {
    const { amount, category_id, date, description, paymentMethod } = req.body;
    const returnedDate = formatedDate(date);

    const data = await Expense.create({
      amount,
      category_id,
      user_id,
      date: returnedDate,
      description,
      paymentMethod,
      proof: proof?.filename || null,
    });

    const findBudget = await Budget.findOne({ where: { category_id: data.category_id,user_id:user_id } });

    if (findBudget) {
      const totalAmount = findBudget.amount;
      const remainingAmount =
        findBudget.remaining > 0
          ? findBudget.remaining - Number(amount)
          : totalAmount - Number(amount);

      const spentAmount = Number(findBudget.spent) + Number(amount);

      findBudget.remaining = remainingAmount;
      findBudget.spent = spentAmount;

      await findBudget.save(); 
    }

    return sendSuccess(res, 'Expense created successfully', data, 201);
  } catch (error) {
    return sendError(res, 'Failed to create expense', error.message);
  }
};


    export const getAll = async(req,res) =>{
      const user_id = req.user.id;
        try{
            const getData = await Expense.findAll({
                 where : { status:'ACTIVE',user_id:user_id },
                 include:[{  model: Category,as:'category',}]
                });

            if(!getData){
                return sendError(res,'data not found',null,404)
            }
            return sendSuccess(res,'Data retrived successfully',getData)

        }
        catch(error){
           return sendError(res,'Failed to fetch expense',error.message)

        }
    }

    export const getById = async (req,res) =>{
        const id = req.params.id;
        try{
            const expense = await Expense.findOne({ where : {id:id}});
            if(!expense){
            return sendError(res,'Data not found',null,404)
            }
            return sendSuccess(res,'data retrived successfully',expense)
        }
        catch(error){
            return sendError(res,'Failed to fetch data',error.message);
        }
    }

   export const updateExpense = async (req, res) => { 
  const expense_id = req.params.id;
  const user_id = req.user?.id;

  try {
    const proof = req.file?.filename || null;
    const { amount, category_id, date, description, paymentMethod } = req.body;

    const returnedDate = formatedDate(date);

    // 1. Find existing expense
    const expense = await Expense.findOne({ where: { id: expense_id } });

    if (!expense) {
      return sendError(res, 'Expense not found', null, 404);
    }

    const oldAmount = Number(expense.amount); // For budget adjustment
    const newAmount = Number(amount);

    // 2. Update fields
    expense.amount = newAmount;
    expense.user_id = user_id;
    expense.category_id = category_id;
    expense.date = returnedDate;
    expense.description = description;
    expense.paymentMethod = paymentMethod;
    expense.proof = proof || expense.proof;

    await expense.save();

    // 3. Adjust budget if budget exists for this category
    const budget = await Budget.findOne({ where: { category_id } });

    if (budget) {
      // Remove old expense, then apply new one
      const updatedSpent = Number(budget.spent) - oldAmount + newAmount;
      const updatedRemaining = Number(budget.amount) - updatedSpent;

      budget.spent = updatedSpent;
      budget.remaining = updatedRemaining;
      await budget.save();
    }

    return sendSuccess(res, 'Expense updated successfully', expense, 200);
  } catch (error) {
    console.error("Error updating expense:", error);
    return sendError(res, 'Failed to update expense', error.message);
  }
};


    export const deleteExpense = async (req,res) =>{
        const expense_id = req.params.id;
        try{
            const softDelete = await Expense.findOne({ where: {id:expense_id}});
            if(!softDelete){
             return sendError(res,'data not found',null,404)
            }
             const deleted = await softDelete.destroy(expense_id);
                console.log("deleted----",deleted);
            // softDelete.status = 'DELETE';
            await softDelete.save();

            return sendSuccess(res,'Data deleted successfully',softDelete)

        }
        catch(error){
               return sendError(res,'Failed to delete expense',error.message)

        }
    }

