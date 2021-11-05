import axios from 'axios';
import store from '../store';
import { checkUser, signout } from '../store/actions/auth';
const API = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  },
});

API.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status !== 401) {
      throw err;
    }
    if (typeof err.response.data.error.name !== 'undefined') {
      if (typeof err.response.data.error.name !== 'TokenExpiredError') {
        store.dispatch(signout());
        throw err;
      }
    }
  }
);

export default API;