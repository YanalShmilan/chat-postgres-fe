import API from './api';

export const AuthService = {
  signin: async (data, navigate) => {
    try {
      const res = await API.post('/signin', data);
      setHeaderAndStorage(res.data.token);
      navigate('/');
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  signup: async (data, navigate) => {
    try {
      const res = await API.post('/signup', data);
      setHeaderAndStorage(res.data.token);
      navigate('/');
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  updateProfile: async (data) => {
    try {
      const res = await API.post('/users/update', data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  signout: (navigate) => {
    API.defaults.headers['Authorization'] = ``;
    localStorage.removeItem('token');
    navigate('/signin');
  },
};

export const setHeaderAndStorage = (token) => {
  API.defaults.headers['Authorization'] = `Bearer ${token}`;
  localStorage.setItem('token', token);
};
