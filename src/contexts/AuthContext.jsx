/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// action - state management
import { LOGIN, LOGOUT } from '@/store/actions';
import accountReducer from '@/store/accountReducer';

// project imports
import Loader from '@/ui-component/Loader';
import { login, logoutUser, getUserDetail } from '@/utils/services/auth.services';
import { getToken, setToken, getUserData } from '@/utils/token';
import { decryptData, encodeData } from '@/utils/base64';

// const
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
};

// ==============================|| AUTH CONTEXT & PROVIDER ||============================== //

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  useEffect(() => {
    async function checkingLogin() {
      const token = await getToken('ACCESS_TOKEN');
      const data = decryptData(window.localStorage.getItem('@_ui_us') ? window.localStorage.getItem('@_ui_us') : {});
      if (token && data) {
        const userData = await getUserData();
        dispatch({
          type: LOGIN,
          payload: {
            isLoggedIn: true,
            user: {
              ...userData,
            },
          },
        });
      } else {
        dispatch({
          type: LOGOUT,
        });
      }
    }
    checkingLogin();
  }, [dispatch]);

  const getUserInfo = async () => {
    const res = await getUserDetail();
    if (res.status === 200) {
      const data = encodeData(res.data.data[0]);
      window.localStorage.setItem('@_ui_us', data);
      dispatch({
        type: LOGIN,
        payload: {
          isLoggedIn: true,
          user: {
            ...res.data.data[0],
          },
        },
      });
    }
  };

  const submitLogin = async (email, password) => {
    const res = await login({ email, password });
    if (res.status !== 201) {
      return res;
    } else {
      setToken(res.data.data);
      getUserInfo();
    }
  };

  const logout = async () => {
    try {
      const response = await logoutUser();
      dispatch({
        type: LOGOUT,
      });
      return response;
    } catch (errors) {
      return errors;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        submitLogin,
        getUserInfo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContext;
