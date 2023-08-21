/* eslint-disable class-methods-use-this */
import axios from '@/utils/axios';
import { purgeToken, setUpdateToken } from '../token';

export const login = async (payload) => {
  try {
    const response = await axios.post('auth/login', payload);
    return response;
  } catch (errors) {
    return errors.response;
  }
};

export const getUserDetail = async (email) => {
  try {
    const response = await axios.get(`/user/all?email=${email}`);
    return response;
  } catch (errors) {
    return errors.response;
  }
};

export const revoke = async (refreshToken) => {
  try {
    const response = await axios.post('auth/revoke', null, { headers: { Authorization: `bearer ${refreshToken}` } });
    if (response.status === 200) {
      await setUpdateToken({ ...response.data.data });
      response.config.headers.Authorization = `bearer {${response.data.data.accessToken}}`;
    }
    return response;
  } catch (errors) {
    await purgeToken();
    window.location.href = '/login';
    return errors;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post('auth/logout');
    if (response.status === 200) {
      purgeToken();
      window.location.href = '/login';
    }
    return response;
  } catch (errors) {
    return errors;
  }
};
