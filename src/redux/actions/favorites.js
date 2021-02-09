import axios from 'axios';
import jwtDecode from 'jwt-decode';
import store from '../store/store';
import { setAlert } from './alert';
import {
  ADD_FAVORITES,
  ADD_FAVORITES_FAILED,
  REMOVE_FAVORITES,
  FETCH_FAVORITES,
} from './types';

export const addToFavorites = (id) => async (dispatch) => {
  try {
    await axios
      .post(`http://10.0.0.5:4000/api/item/add-to-favorites/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((data) => {
        return Promise.all([
          dispatch({
            type: ADD_FAVORITES,
            payload: data,
            isLoaded: true,
          }),
          dispatch(allFavorites()),
          dispatch(setAlert('Add to favorites  successfully!', 'success')),
        ]);
      });
  } catch (err) {
    console.log(err);
    if (err.response.data) {
      dispatch(setAlert('Please login first!', 'warning'));
    } else {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'warning')));
      }
      dispatch({
        type: ADD_FAVORITES_FAILED,
      });
    }
  }
};

export const allFavorites = (cancelToken) => (dispatch) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
      cancelToken: cancelToken,
    },
  };
  const token = store.getState().auth.token;
  const { user } = jwtDecode(token);
  let USER_ID = user.userId;
  axios
    .get(`http://10.0.0.5:4000/api/item/favorites/${USER_ID}`, config)
    .then((response) => {
      dispatch({
        type: FETCH_FAVORITES,
        payload: response.data,
        isLoaded: true,
        error: null,
      });
    })
    .catch((error) => {
      throw error;
    });
};

export const removeFavorites = (id) => (dispatch) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .post(`http://10.0.0.5:4000/api/item/removeFavorites/${id}`, config)
    .then((res) => {
      return Promise.all([
        dispatch(allFavorites()),
        dispatch({
          type: REMOVE_FAVORITES,
          payload: res.data,
          isLoaded: true,
          error: null,
        }),
        dispatch(setAlert('Remove to favorites successfully!', 'success')),
      ]);
    })
    .catch((err) => console.log(err));
};
