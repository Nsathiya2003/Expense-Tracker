import { deleteUploadedFile } from "../middleware/auth.js";
import { requiredField } from "../middleware/errorMiddleware.js";
import { formatedDate } from "../middleware/helper.js";
import Income from "../models/incomeModel.js";

    export const addIncome = async (req, res) => {
        const proof = req.file;

      try {
        const { amount, category, source, description, date } = req.body;
            if (!amount || !category || !source || !date) {
          return res.status(400).json({ error: "Required fields are missing." });
        }
        console.log("date---",date);

        const returnedDate = formatedDate(date);

        const income = await Income.create({ 
          amount,
          category,
          source,
          description,
          date:returnedDate,
          proof:proof?.filename,
        });

        res.status(201).json({ message: "Income added successfully", income });
      } 
      catch (error) {
        await deleteUploadedFile(proof); 
        console.error("--- Error adding income ---", error);
        res.status(500).json({ error: "Server error. Could not add income." });
      }
    };

    export const getAll = async (req, res) => {
          try {
            const incomes = await Income.findAll({where: { status:'ACTIVE'}});
            res.status(200).json({ message:"All incomes retrived successfully",incomes})
          } 
          catch (error) {
            console.error("Error fetching incomes:", error);
            res.status(500).json({ error: "Server error. Could not fetch incomes." });
          }
    };

    export const updateIncome = async (req,res) =>{
      const id = req.params.id;
      console.log("id-----",id)
      try{
        const { amount, category, source, description, date } = req.body;
        console.log("date---",date);

        const returnedDate = formatedDate(date);

        const data = await Income.findOne({ where:{id: id} });
        console.log("data---",data);
        await data.update({
          amount,
          category,
          source,
          description,
          date:returnedDate
        });
        res.status(201).json({message:"Income Updated successfully",data});
      } 
      catch(error){
        res.status(500).json({ error: "Server error. Could not add income."})
        console.log("error---",error);
      }
      
    }

    export const deleteIncome = async (req,res) =>{
      const income_id = req.params.id;
      try{
        if(!income_id){
          throw new Error('Income id is required');
        }
        const softDelete = await Income.findOne({ where : { id: income_id}});
        softDelete.status = 'DELETE';

        await softDelete.save();

        return res.status(201).json({
          status:true,
          message:"Data deleted successfully",
          data:softDelete
        })
      }

      catch(error){
        res.status(500).json({
          status:false,
          message:'Internal server error',
        })
      }
    }
  

  

  
