import React, { createContext, useContext, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';

const defaultAuthState = {
  user: null,
};

const token = localStorage.getItem('token');
if (token) {
  const decodedToken = jwtDecode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
  } else {
    defaultAuthState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: defaultAuthState.user,
  login: () => {},
  logout: () => {},
  register: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
    case 'REGISTER':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children, ...props }) => {
  const [state, dispatch] = useReducer(authReducer, defaultAuthState);

  const login = (userData) => {
    localStorage.setItem('token', userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  const value = useMemo(
    () => ({
      login,
      logout,
      state,
    }),
    [login, logout, state]
  );

  return (
    <AuthContext.Provider value={value} {...props}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('AuthContext must be used with AuthContext!');
  return context;
};

AuthContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf([PropTypes.node])]),
};

AuthContextProvider.defaultProps = {
  children: undefined,
};
