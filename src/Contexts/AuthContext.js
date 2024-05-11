import { useState, useEffect, createContext } from 'react';
import { CircularProgress, Backdrop } from '@mui/material';
import { getMe, logout } from '../Utils/Auth';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { user } = await getMe();
        setLoggedIn(true);
        setUser(user);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    })();
  }, []);

  const loginAccount = (data) => {
    setLoggedIn(true);
    setUser(data.user);
    localStorage.setItem('x-access-token', data.token.value);
  };

  const logoutAccount = async (callback) => {
    await logout();

    localStorage.removeItem('x-access-token');
    setLoggedIn(false);
    setUser(null);

    callback();
  };

  const values = {
    user,
    setUser,
    loggedIn,
    loginAccount,
    logoutAccount,
    isLoginOpen,
    setIsLoginOpen
  };

  return (
    <AuthContext.Provider value={values}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
