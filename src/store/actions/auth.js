import { AuthService, setHeaderAndStorage } from '../../services/AuthService';
import jwt_decode from 'jwt-decode';
import { SIGNIN, SIGNUP, SIGNOUT, UPDATE_PROFILE } from '../types/index';
export const signin = (userInfo, navigate) => async (dispatch) => {
  const data = await AuthService.signin(userInfo, navigate);
  const token = data.token;
  const user = jwt_decode(token);
  dispatch({
    type: SIGNIN,
    payload: user,
  });
};

export const signup = (userInfo, navigate) => async (dispatch) => {
  const data = await AuthService.signup(userInfo, navigate);
  const token = data.token;
  const user = jwt_decode(token);
  dispatch({
    type: SIGNUP,
    payload: user,
  });
};
export const updateProfile = (userInfo) => (dispatch) => {
  const user = AuthService.updateProfile(userInfo).then((user) => {
    dispatch({
      type: UPDATE_PROFILE,
      payload: user,
    });
  });
};

export const signout = (navigate) => async (dispatch) => {
  AuthService.signout(navigate);
  dispatch({
    type: SIGNOUT,
  });
};

export const checkUser = () => {
  return async (dispatch) => {
    try {
      if (localStorage.getItem('token')) {
        const decodedToken = jwt_decode(localStorage.getItem('token'));

        setHeaderAndStorage(localStorage.getItem('token'));
        console.log(decodedToken.exp, Date.now());

        if (decodedToken.exp > Date.now()) {
          console.log(decodedToken.exp > Date.now());
          dispatch({
            type: SIGNIN,
            payload: decodedToken,
          });
        } else {
          dispatch({
            type: SIGNOUT,
          });
        }
      } else {
        dispatch({
          type: SIGNOUT,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
