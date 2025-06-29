import axiosClient from './axiosClient';

export const apiClient = {
  get: (url, config = {}) => axiosClient.get(url, config),
  post: (url, data, config = {}) => {
    const isForm = data instanceof FormData;
    return axiosClient.post(url, data, {
      ...config,
      headers: {
        ...(config.headers || {}),
        ...(isForm ? {} : { 'Content-Type': 'application/json' }),
      },
    });
  },
  put: (url, data, config = {}) => {
    const isForm = data instanceof FormData;
    return axiosClient.put(url, data, {
      ...config,
      headers: {
        ...(config.headers || {}),
        ...(isForm ? {} : { 'Content-Type': 'application/json' }),
      },
    });
  },
  del: (url, config = {}) => axiosClient.delete(url, config),
};
