import { sendError, sendSuccess } from "../middleware/helper.js";
import { Category } from "../models/categoryModel.js"

    export const createCategory = async (req,res) => {
        const user_id = req.user?.id;
        try{
            const {name,description} = req.body;
            console.log("name----",name)
            const category = await Category.create({
                name:name,
                description:description,
                user_id:user_id
            });
            return sendSuccess(res,'Category created successfully',category,201)
        }
        catch(error){
            return sendError(res,'Failed to create category',error.message);
        }
    }

    export const  getAll = async (req,res) =>{
            const user_id = req.user.id;
        try{
            const category = await Category.findAll({ where : { status:"ACTIVE",user_id: user_id } });
            return sendSuccess(res,'All data retrived successfully',category)
        }
        catch(error){
            return sendError(res,'Failed to fetch datas',error.message);
        }
    }

    export const getById = async (req,res) => {
        const id = req.params.id;
        try{
            const category = await Category.findOne({ where : { id: id}});
            if(!category){
                throw new Error ('No category found for your provided id');
            }
            return sendSuccess(res,'Category retrived successfully',category)
        }
        catch(error){
            return sendError(res,'Failed to fetch category',error.message)
        }
    }

    export const updateCategory = async (req,res) =>{
        const id = req.params.id;
        const user_id = req.user?.id;

        try{
            const { name,description } = req.body;
            const category = await Category.findOne({
                where: { id : id}
            });
            if(category){
                category.name = name,
                category.description = description,
                category.user_id = user_id
                await category.save();
            }
            return sendSuccess(res,'Category updated sucessfully',category)
        }
        catch(error){
            return sendError(res,'Failed to Update',error.message)
        }
    }

    export const deleteCategory = async (req,res) =>{
        const id = req.params.id;
        try{
            const category = await Category.findOne({where : { id : id}});
            const deleted = await category.destroy(id);
              console.log("deleted----",deleted);   
             await category.save();

            return sendSuccess(res,'Category deleted successfully',category)
        }
        catch(error){
            return sendError(res,'Failed to delete category',error.message)
        }
    }
    