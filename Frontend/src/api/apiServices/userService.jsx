// import axiosClient from './axiosClient';

import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react";

// export const apiClient = {
//   get: (url, config = {}) => axiosClient.get(url, config),
//   post: (url, data, config = {}) => {
//     const isForm = data instanceof FormData;
//     return axiosClient.post(url, data, {
//       ...config,
//       headers: {
//         ...(config.headers || {}),
//         ...(isForm ? {} : { 'Content-Type': 'application/json' }),
//       },
//     });
//   },
//   put: (url, data, config = {}) => {
//     const isForm = data instanceof FormData;
//     return axiosClient.put(url, data, {
//       ...config,
//       headers: {
//         ...(config.headers || {}),
//         ...(isForm ? {} : { 'Content-Type': 'application/json' }),
//       },
//     });
//   },
//   del: (url, config = {}) => axiosClient.delete(url, config),
// };

//Common mutation function 
export const useCustomMutation = (mutationFn,options={}) =>{
     const mutation = useMutation({mutationFn,...options })
     return mutation;
};

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
    return res;
  }
  catch(err){
    throw err;
  }
}




