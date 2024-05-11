import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_PATH
});

const token = localStorage.getItem('x-access-token');
instance.defaults.headers.common['x-access-token'] = token;

instance.interceptors.request.use(
  function (config) {
    if (token) {
      config.headers.authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const login = async (body) => {
  const { data } = await instance.post('/authentication/login', body);
  return data;
};

export const register = async (body) => {
  const { data } = await instance.post('/authentication/register', body);
  return data;
};

export const getMe = async () => {
  if (!token) return null;

  const { data } = await instance.get('/authentication/me');
  return data;
};

export const logout = async () => {
  if (!token) return null;

  const { data } = await instance.get('/authentication/logout');
  return data;
};

export default instance;
