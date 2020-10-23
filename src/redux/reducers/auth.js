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
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAIL,
  REMOVE_UPDATE_SUCCESS_MESSAGE,
} from '../actions/types';

let initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  message: '',
  user: {
    fistname: '',
    lastname: '',
    avatar: '',
    active: false,
  },
  update: false,
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
        active: true,
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
        active: true,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        ...payload,
        message: payload,
        isAuthenticated: true,
        loading: false,
        active: true,
        update: true,
      };
    case REMOVE_UPDATE_SUCCESS_MESSAGE:
      return {
        ...state,
        ...payload,
        message: {
          message: '',
        },
        update: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case NEW_PASSWORD_FAIL:
    case UPDATE_PROFILE_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        user: {
          fistname: '',
          lastname: '',
          avatar: '',
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
