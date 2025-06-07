import { sendError, sendSuccess } from "../middleware/helper.js";
import { Category } from "../models/categoryModel.js"

    export const createCategory = async (req,res) => {
        try{
            const {name,description} = req.body;
            console.log("name----",name)
            const category = await Category.create({
                name:name,
                description:description
            });
            return sendSuccess(res,'Category created successfully',category)
        }
        catch(error){
            return sendError(res,'Failed to create category',error.message);
        }
    }

    export const  getAll = async (req,res) =>{
        try{
            const category = await Category.findAll();
            return sendSuccess(res,'All data retrived successfully',category)
        }
        catch(error){
            return sendError(res,'Failed to fetch datas',error.message);
        }
    }

    export const updateCategory = async (req,res) =>{
        const id = req.params.id;
        try{
            const { name,description } = req.body;
            const category = await Category.findOne({
                where: { id : id}
            });
            if(category){
                category.name = name,
                category.description = description
                await category.save();
            }
            return sendSuccess(res,'Category updated sucessfully',category)
        }
        catch(error){
            return sendError(res,'Failed to Update',error.message)
        }
    }