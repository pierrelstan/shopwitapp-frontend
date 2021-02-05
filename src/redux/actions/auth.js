import axios from 'axios';
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
import { setAlert } from './alert';
import setAuthToken from '../../utils/setAuthToken';

// Load user
export const loadUser = () => async (dispatch) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let token = localStorage.getItem('token');

  if (token) {
    setAuthToken(token);
  }
  try {
    let data = await axios.get('http://10.0.0.5:4000/api/auth', config);

    await dispatch({
      type: USER_LOAD,
      payload: data.data,
    });
    // await dispatch(fetchItemsByUserId(data.data._id))
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
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
    axios.post('http://10.0.0.5:4000/api/auth/signup', body).then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
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
      dispatch({
        type: LOGIN_START,
      });
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
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

export const updateProfile = (
  userId,
  avatar,
  firstname,
  lastname,
  location,
  addressLine1,
  addressLine2,
  city,
  stateProvinceRegion,
  zipPostalCode,
  country,
) => async (dispatch) => {
  try {
    let res = await axios.put(
      `http://10.0.0.5:4000/api/auth/user/${userId}/edit`,
      {
        avatar,
        firstname,
        lastname,
        location,
        addressLine1,
        addressLine2,
        city,
        stateProvinceRegion,
        zipPostalCode,
        country,
      },
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
