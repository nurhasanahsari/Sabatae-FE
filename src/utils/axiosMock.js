/**
 * axios setup to use mock service
 */

import axios from 'axios';
import { getToken } from './token';

const axiosServices = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `bearer ${getToken('ACCESS_TOKEN')}`,
  },
});

// interceptor for http
axiosServices.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;
