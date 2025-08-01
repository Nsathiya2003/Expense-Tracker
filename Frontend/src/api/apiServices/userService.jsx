// import axiosClient from './axiosClient';

import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react";


//Common mutation function 
export const useCustomMutation = (mutationFn,options={}) =>{
     const mutation = useMutation({mutationFn,...options })
     return mutation;
};
// const baseUrl = 'http://localhost:3000'

export const imgUrl = async (folderName,fileName) => {
  console.log("folderName---",folderName);
  console.log("fileName---",fileName);
  if (!fileName) return "";
   return `/uploads/${folderName}/${fileName}`;
}

// export const imageUrl = `${baseUrl}/uploads/proof/${}`

export const createUser = async (userData) => {
  try{
    const res = await axios.post('api/user/addUser', userData, {
    headers:{
      'Content-Type':'multipart/form-data'
    }
    });
     return res;
  }
  catch(err){
    console.log("Error create user",err.message);
    throw err;
  }
 
};
 

export const login =async (userData) => {
  try{
    const res = await axios.post('api/user/login',userData);
    console.log("accessToken",res.data?.data?.accessToken);
    const token = localStorage.setItem('token',res.data?.data?.accessToken);
    const user_id = localStorage.setItem('user_id',res.data?.data?.user?.id)
    return res;
  }
  catch(err){
    throw err;
  }
}
const token = localStorage.getItem('token');

export const getUserById = async (id) => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`/api/user/getById/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};



//Master - Category
export const addCategory = async(body) =>{
  try{
    const res = await axios.post('/api/master/category/add',body,{
      headers:{
        // 'Content-Type':'appl/form-data',
        'Authorization':`Bearer ${token}`
      }
    })
    console.log("response---",res);
    return res;
  }
  catch(error){
    console.log("error--",error);
    throw error;
  }
   
}

export const getCategory = async () =>{
  try{
    const res = await axios.get('/api/master/category/getAll',{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
    return res?.data;
  }
  catch(error){
    throw error;
  }
}
export const getCategoryById = async (id) => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`/api/master/category/getById/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateCategory = async (id, updatedData) => {
  const token = localStorage.getItem('token');
  const res = await axios.put(`/api/master/category/update/${id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteCategory = async (id) => {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`/api/master/category/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

//income
export const addIncome = async (body) =>{
    console.log("addIncomedata is----",body);

  try{
    const res = await axios.post('/api/income/add',body,{
      headers:{
        'Content-Type':'multipart/form-data',
        'Authorization':`Bearer ${token}`
      }
    })
    return res?.data;
  }
  catch(error){
    throw error;
  }
}

export const getAllIncome = async () =>{
  try{
    const res = await axios.get('/api/income/getAll',{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
    return res?.data;
  }
  catch(error){
    throw new error;
  }
}

export const getIncomeById = async (id) =>{
  try{
    const res = await axios.get(`/api/income/getById/${id}`,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
    return res?.data
  }
  catch(err){
    throw new err;
  }
}

export const deleteIncome = async (id) =>{
  console.log("iddd",id);
  try{
    const res = await axios.delete(`/api/income/delete/${id}`,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
    console.log("response---",res);
    return res?.data;
  }
  catch(error){
    throw new error;
  }
}
export const updateIncome = async (id,data) =>{
  // console.log("updateIncomeee",data);
  //   console.log("updateIncomeee",id);

  try{
    const res = await axios.put(`/api/income/update/${id}`,data,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
    console.log("res----",res);
    return res?.data;
  }
  catch(err){
    console.log("errorr---",err)
    throw err;
  }
}

// export const getImages = async (folder,id) =>{
//   console.log("folder----,id---",folder,id);
//   try{
//     const res = axios.get(`/api/user/get-images/${folder}/${id}`,{
//       headers:{
//         'Authorization': `Bearer ${token}`
//       }
//     })
//     console.log("response----",res);
//     return res;
//   }
//   catch(err){
//     console.log("error is---",err);
//     throw err;
//   }
// }

export const addExpense = async (body) =>{
    console.log("addIncomedata is----",body);

  try{
    const res = await axios.post('/api/expense/add',body,{
      headers:{
        'Content-Type':'multipart/form-data',
        'Authorization':`Bearer ${token}`
      }
    })
    return res?.data;
  }
  catch(error){
    throw error;
  }
}

export const getAllExpense = async () =>{
  try{
    const res = await axios.get('/api/expense/getAll',{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
    return res?.data;
  }
  catch(error){
    throw new error;
  }
}

export const getExpenseById = async (id) =>{
  try{
    const res = await axios.get(`/api/expense/getById/${id}`,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
    return res?.data
  }
  catch(err){
    throw new err;
  }
}

export const deleteExpense = async (id) =>{
  console.log("iddd",id);
  try{
    const res = await axios.delete(`/api/expense/delete/${id}`,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
    console.log("response---",res);
    return res?.data;
  }
  catch(error){
    throw new error;
  }
}
export const updateExpense = async (id,data) =>{
  // console.log("updateIncomeee",data);
  //   console.log("updateIncomeee",id);

  try{
    const res = await axios.put(`/api/expense/update/${id}`,data,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
    console.log("res----",res);
    return res?.data;
  }
  catch(err){
    console.log("errorr---",err)
    throw err;
  }
}

//Budget

export const addBudget = async (body) =>{
    console.log("addIncomedata is----",body);

  try{
    const res = await axios.post('/api/budget/add',body,{
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    })
    return res?.data;
  }
  catch(error){
    throw error;
  }
}

export const getAllBudget = async () =>{
  try{
    const res = await axios.get('/api/budget/getAll',{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
    return res?.data;
  }
  catch(error){
    throw new error;
  }
}

export const getBudgetById = async (id) =>{
  try{
    const res = await axios.get(`/api/budget/getById/${id}`,{ 
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
    return res?.data
  }
  catch(err){
    throw new err;
  }
}

export const deleteBudget = async (id) =>{
  console.log("iddd",id);
  try{
    const res = await axios.delete(`/api/budget/delete/${id}`,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
    console.log("response---",res);
    return res?.data;
  }
  catch(error){
    throw new error;
  }
}
export const updateBudget = async (id,data) =>{
  // console.log("updateIncomeee",data);
  //   console.log("updateIncomeee",id);

  try{
    const res = await axios.put(`/api/budget/update/${id}`,data,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
    console.log("res----",res);
    return res?.data;
  }
  catch(err){
    console.log("errorr---",err)
    throw err;
  }
}