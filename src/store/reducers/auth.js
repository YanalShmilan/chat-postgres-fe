import { SIGNIN, SIGNOUT, SIGNUP, UPDATE_PROFILE } from '../types/index';

const initialState = {
  user: {},
  isLoggedIn: false,
};
const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGNIN:
      return {
        ...state,
        user: payload,
        isLoggedIn: true,
      };
    case SIGNUP:
      return {
        ...state,
        user: payload,
        isLoggedIn: true,
      };
    case SIGNOUT:
      return {
        ...state,
        user: {},
        isLoggedIn: false,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        user: payload,
      };

    default: {
      return state;
    }
  }
};

export default authReducer;
