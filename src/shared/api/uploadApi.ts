import axios from 'axios';

import { getToken } from '@/shared/lib';

export const uploadApi = axios.create({
  baseURL: import.meta.env.VITE_IMAGE_BASE_URL,
  timeout: 30000,
});

uploadApi.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
