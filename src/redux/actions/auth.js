import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
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
} from './types';
import store from '../store/store';
import { setAlert } from './alert';
import setAuthToken from '../../utils/setAuthToken';

// Load user
export const loadUser = () => async (dispatch) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let TOKEN = localStorage.getItem('token');

  if (TOKEN !== null) {
    setAuthToken(TOKEN);
    try {
      let data = await axios.get('http://10.0.0.5:4000/api/auth/me', config);

      return dispatch({
        type: USER_LOAD,
        payload: data.data,
      });
      // await dispatch(fetchItemsByUserId(data.data._id))
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  }
};

// register user
export const register = ({
  firstname,
  lastname,
  email,
  password,
  confirmPassword,
  //   error,
}) => async (dispatch) => {
  const body = {
    firstname,
    lastname,
    email,
    password,
    confirmPassword,
    // error,
  };

  try {
    await axios
      .post('http://10.0.0.5:4000/api/auth/signup', body)
      .then((res) => {
        const token = res.data.token;
        const user = jwtDecode(token); // decode your token here
        localStorage.setItem('token', token);

        Promise.all(
          dispatch({
            type: REGISTER_SUCCESS,
            payload: token,
          }),
          dispatch(loadUser()),
        );
      });
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login user
export const Log_in = (user) => (dispatch) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios.post('http://10.0.0.5:4000/api/auth/login', user, config).then(
    (res) => {
      Promise.all([
        dispatch({
          type: LOGIN_START,
        }),
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        }),
        dispatch(loadUser()),
      ]);
    },
    (error) => {
      // error handling
      let errors = error.response.data.errors;
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));

      dispatch({
        type: LOGIN_FAILURE,
      });
      if (axios.isCancel(error)) {
        console.log('request cancelled');
      } else {
        console.log('some other reason');
      }
    },
  );
};

// Log out clear profile

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

export const newPassWord = (token, state, props) => async (dispatch) => {
  try {
    let res = await axios.post(
      `http://10.0.0.5:4000/api/auth/newpassword/${token}`,
      state,
    );

    dispatch({
      type: NEW_PASSWORD,
      payload: res.data,
    });

    props.history.push('/');
  } catch (error) {
    dispatch({
      type: NEW_PASSWORD_FAIL,
    });
  }
};

export const updateProfile = (User) => async (dispatch) => {
  const token = store.getState().auth.token;
  const { user } = jwtDecode(token);
  let USER_ID = user.userId;
  try {
    let res = await axios.put(
      `http://10.0.0.5:4000/api/auth/user/${USER_ID}/edit`,
      User,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (res) {
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
        update: true,
      });
      dispatch(setAlert('Update profile successfully!', 'success'));
      setTimeout(() => {
        dispatch({
          type: REMOVE_UPDATE_SUCCESS_MESSAGE,
          update: false,
        });
      }, 3000);
      dispatch(loadUser());
    } else {
      console.log('connect to internet');
    }
  } catch (error) {
    // error handling
    console.log(error.response);
    let errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      dispatch({
        type: UPDATE_PROFILE_FAIL,
      });
    }
  }
};
