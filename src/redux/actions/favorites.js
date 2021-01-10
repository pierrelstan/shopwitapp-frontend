import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_FAVORITES,
  ADD_FAVORITES_FAILED,
  REMOVE_FAVORITES,
  FETCH_FAVORITES,
} from './types';

export const addToFavorites = (id, userId) => async (dispatch) => {
  try {
    await axios
      .post(`http://localhost:4000/item/add-to-favorites/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((data) => {
        dispatch({
          type: ADD_FAVORITES,
          payload: data,
          isLoaded: true,
        });
        dispatch(allFavorites());
        dispatch(setAlert('Add to favorites  successfully!', 'success'));
      });
  } catch (err) {
    if (err.response.data.msg) {
      dispatch(setAlert('Please login first!', 'warning'));
    }
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'warning')));
    }
    dispatch({
      type: ADD_FAVORITES_FAILED,
    });
  }
};

export const allFavorites = (userId) => (dispatch) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  axios
    .get(`http://localhost:4000/item/favorites/${userId}`, config)
    .then((response) => {
      dispatch({
        type: FETCH_FAVORITES,
        payload: response.data,
        // isLoaded: true,
        error: null,
      });
    });
};

export const removeFavorites = (id) => (dispatch) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .post(`http://localhost:4000/item/removeFavorites/${id}`, config)
    .then((res) => {
      dispatch({
        type: REMOVE_FAVORITES,
        payload: res.data,
        isLoaded: true,
        error: null,
      });
      dispatch(setAlert('Remove to favorites successfully!', 'success'));
      dispatch(allFavorites());
    })
    .catch((err) => console.log(err));
};
