import axios from 'axios';
import { revoke } from './services/auth.services';
import { getToken } from './token';

/**
 * Create Axios instance.
 */
const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `bearer ${getToken('ACCESS_TOKEN')}`,
  },
});

/**
 * Default request interceptor axios.
 */
AxiosInstance.interceptors.request.use(
  (config) => {
    if (config.url !== 'auth/revoke') config.headers.Authorization = `bearer ${getToken('ACCESS_TOKEN')}`;
    if (config.url === 'auth/logout') config.headers.Authorization = `bearer ${getToken('REFRESH_TOKEN')}`;
    return config;
  },
  (errors) => Promise.reject(errors)
);

/**
 * Default response interceptors axios.
 */
AxiosInstance.interceptors.response.use(
  (response) => response,
  async (errors) => {
    const oldConfigAxios = errors.config;
    const statusCode = errors?.response?.status;
    const messageErrors = errors?.response?.data?.message;
    if (statusCode === 401 && (messageErrors === 'Expired token...' || messageErrors === 'Expired token ...')) {
      const refreshToken = getToken('REFRESH_TOKEN');
      const resToken = await revoke(refreshToken);
      if (resToken.status === 200) {
        oldConfigAxios.headers.Authorization = `bearer ${getToken('ACCESS_TOKEN')}`;
        return AxiosInstance(oldConfigAxios);
      }
    }
    return Promise.reject(errors);
  }
);

export default AxiosInstance;
