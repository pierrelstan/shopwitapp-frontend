import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOAD,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  NEW_PASSWORD,
  NEW_PASSWORD_FAIL,
} from '../actions/types';

let initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: {
    fistname: '',
    lastname: '',
    avatar: 'https://share.getcloudapp.com/9ZuBqDyK',
    active: false,
  },
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOAD:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case NEW_PASSWORD:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case NEW_PASSWORD_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        user: {
          fistname: '',
          lastname: '',
          avatar: 'https://share.getcloudapp.com/9ZuBqDyK',
          active: false,
        },
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
}
