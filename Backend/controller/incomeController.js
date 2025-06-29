import { deleteUploadedFile } from "../middleware/auth.js";
import { requiredField } from "../middleware/errorMiddleware.js";
import { formatedDate, sendError, sendSuccess } from "../middleware/helper.js";
import Income from "../models/incomeModel.js";

    export const addIncome = async (req, res) => {
        const proof = req.file;
        const user_id = req.user?.id;

      try {
        const { amount, category, source, description, date } = req.body;
            if (!amount || !category || !source || !date) {
          return res.status(400).json({ error: "Required fields are missing." });
        }
        const returnedDate = formatedDate(date);

        const income = await Income.create({ 
          amount,
          category,
          source,
          description,
          date:returnedDate,
          proof:proof?.filename,
          user_id:user_id
        });

        return sendSuccess(res,'Income created successfully',income,201)
      } 
      catch (error) {
        await deleteUploadedFile(proof); 
        return sendError(res,'Failed to create income',error.message)
      }
    };

    export const getAll = async (req, res) => {
          try {
            const income = await Income.findAll({where: { status:'ACTIVE'}});
          if(!income){
            return sendError(res,'Income data not found',null,404)
          }
            return sendSuccess(res,'Data retrived successfully',income)
          } 
          catch (error) {
            return sendError(res,'Failed to fetch income',error.message)
          }
    };

    export const getById = async (req,res) =>{
      const id = req.params.id;
      try{
        const income = await Income.findOne({ where : { id: id}})
        if(!income){
          return sendError(res,'Income data not found',null,404)
        }
        return sendSuccess(res,'Data retrived successfuly',income)
      }
      catch(error){
        return sendError(res,'Failed to fetch data',error.message)
      }
    }

    export const updateIncome = async (req,res) =>{
      const id = req.params.id;
      const user_id = req.user?.id;
      try{
        const { amount, category, source, description, date } = req.body;
        const returnedDate = formatedDate(date);
        const data = await Income.findOne({ where:{id: id} });
        if(!data){
          return sendError(res,'Income data not found',null,404)
        }
        await data.update({
          amount,
          category,
          source,
          description,
          user_id,
          date:returnedDate
        });
          return sendSuccess(res,'income updated successfully',data)
      } 
      catch(error){
        return sendError(res,'Failed to update income',error.message)
      }
      
    }

    export const deleteIncome = async (req,res) =>{
      const income_id = req.params.id;
      try{
        if(!income_id){
          throw new Error('Income id is required');
        }
        const softDelete = await Income.findOne({ where : { id: income_id}});
        if(!softDelete){
          return sendError(res,'Income data not found',null,404)
        }
        softDelete.status = 'DELETE';

        await softDelete.save();
         return sendSuccess(res,'Data retrived successfully',softDelete)
      }

      catch(error){
         return sendError(res,'Failed to delete income',error.message)

      }
    }
  

  

  
