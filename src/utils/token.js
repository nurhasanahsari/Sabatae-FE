/* eslint-disable no-else-return */
import { decryptData } from './base64';

export const setToken = async (token) => {
  try {
    return window.localStorage.setItem('token', JSON.stringify(token));
  } catch (errors) {
    return errors;
  }
};

export const setUpdateToken = async (data) => {
  try {
    const oldToken = JSON.parse(window.localStorage.getItem('token'));
    return window.localStorage.setItem('token', JSON.stringify({ ...oldToken, ...data }));
  } catch (errors) {
    return errors;
  }
};

/**
 *
 * @param {string} type TYPE : ALL (return object), ACCESS_TOKEN (return string), REFRESH_TOKEN (return string)
 * @returns String and object by Type.
 */
export const getToken = (_type = 'ALL') => {
  const token = JSON.parse(window.localStorage.getItem('token'));
  switch (_type) {
    case 'ALL':
      return token;
    case 'ACCESS_TOKEN':
      return token?.accessToken;
    case 'ACCESS_TOKEN_SIAKAD':
      return token?.accessTokenSiakad;
    case 'REFRESH_TOKEN':
      return token?.refreshToken;
    case 'REFRESH_TOKEN_SIAKAD':
      return token?.refreshTokenSiakad;
    default:
      return token;
  }
};

export const getRefreshToken = () => {
  const token = JSON.parse(window.localStorage.getItem('token'));
  return token?.refreshToken;
};

export const purgeToken = () => {
  try {
    return window.localStorage.clear();
  } catch (errors) {
    return errors;
  }
};

export const getUserData = async () => {
  const data = await decryptData(window.localStorage.getItem('@_ui_us'));
  if (data) {
    return data;
  } else {
    return null;
  }
};

export const token = {
  setToken,
  getToken,
  purgeToken,
  getUserData,
};

export default token;
