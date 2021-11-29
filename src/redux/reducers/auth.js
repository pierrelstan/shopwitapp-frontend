import storage from 'redux-persist/lib/storage';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOAD,
  AUTH_ERROR,
  LOGIN_START,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
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
  loadingLogin: false,
  loadingStart: false,
  message: '',
  user: {
    fistname: '',
    lastname: '',
    avatar: '',
    active: false,
  },
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_START:
      return { ...state, loadingStart: true };
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
        isAuthenticated: false,
        loading: false,
        loadingStart: true,
        active: true,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        ...payload,
        message: payload,
        isAuthenticated: true,
        loading: false,
        loadingLogin: false,
      };
    case REMOVE_UPDATE_SUCCESS_MESSAGE:
      return {
        ...state,
        ...payload,
        message: {
          message: '',
        },
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAILURE:
    case NEW_PASSWORD_FAIL:
    case UPDATE_PROFILE_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      storage.removeItem('persist:auth');

      return {
        ...state,
        loadingLogin: false,
        user: {
          fistname: '',
          lastname: '',
          avatar: '',
          active: false,
        },
        token: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
}
