import {jwtDecode} from 'jwt-decode';
import store from '../store/store';
import { setAlert } from './alert';
import {
  ADD_FAVORITES,
  ADD_FAVORITES_FAILED,
  REMOVE_FAVORITES,
  FETCH_FAVORITES,
} from './types';
import WebAPI from '../../utils/service';

export const addToFavorites = (id) => async (dispatch) => {
  try {
    let token = store.getState().auth.token;
    let { user } = jwtDecode(token);
    try {
      let USER_ID = user.userId;
      let data = await WebAPI.addToFavorites(id, USER_ID);
      Promise.all([
        dispatch({
          type: ADD_FAVORITES,
          payload: data,
          isLoaded: true,
        }),
        dispatch(allFavorites()),
        dispatch(setAlert('Add to favorites  successfully!', 'success')),
      ]);
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'warning')));
      }
      dispatch({
        type: ADD_FAVORITES_FAILED,
      });
    }
  } catch (e) {
    dispatch(setAlert('Please login first!', 'warning'));
  }
};

export const allFavorites = (cancelToken) => (dispatch) => {
  const token = store.getState().auth.token;
  const { user } = jwtDecode(token);
  let USER_ID = user.userId;
  WebAPI.allFavorites(USER_ID)
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
  const token = store.getState().auth.token;
  const { user } = jwtDecode(token);
  let USER_ID = user.userId;

  WebAPI.removeFavorites(id, USER_ID)
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
    .catch((err) => {});
};
