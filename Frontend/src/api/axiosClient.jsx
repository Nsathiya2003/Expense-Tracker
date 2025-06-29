const { default: axios } = require("axios");

//for vite must use import.meta.env;
const base_url = import.meta.env.VITE_BASE_API;
console.log("base_url", base_url);

// add axios for each requests
const axiosClient = axios.create({
    baseURL:base_url,
    headers:{
        'Content-Type':'application-json'
    }
})

//Interceptor - add token for each request
axiosClient.interceptors.request.use((config) =>{
    const token = localStorage.getItem('token');
    if(token) config.headers.Authorization = `Bearer ${token}`
    return config;
})

axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.warn('401 Unauthorized');
    }

    const contentType = error.response?.headers?.['content-type'];
    let message = 'API Error';

    if (contentType?.includes('application/json')) {
      message = error.response?.data?.message || message;
    } else {
      message = await error.response?.data;
    }

    return Promise.reject(message);
  }
);

export default axiosClient;

