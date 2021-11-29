import jwtDecode from 'jwt-decode';
import store from '../store/store';
import {
  ADD_TO_CART_BY_ID,
  FAILED_ADD_TO_CART_BY_ID,
  FETCH_CARTS,
  REMOVE_CART_BY_IDS,
  REMOVE_CART_BY_ID,
  UPDATE_CART,
  SET_ALERT,
} from './types';
import { setAlert } from './alert';
import WebAPI from '../../utils/service';
import { openCart } from './openCart';

export const addToCart = (id) => async (dispatch) => {
  try {
    let token = store.getState().auth.token;
    let { user } = jwtDecode(token);
    try {
      let USER_ID = user.userId;
      let data = await WebAPI.addToCart(id, USER_ID);
      dispatch({
        type: ADD_TO_CART_BY_ID,
        payload: data,
        isLoaded: true,
      });
      dispatch(allCarts());
      dispatch(setAlert('Add to cart successfully!', 'success'));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'warning')));
      }
      dispatch({
        type: FAILED_ADD_TO_CART_BY_ID,
      });
    }
  } catch (e) {
    dispatch(setAlert('Please login first!', 'warning'));
  }
};

export const allCarts = () => async (dispatch) => {
  try {
    let carts = await WebAPI.allCarts();
    dispatch({
      type: FETCH_CARTS,
      payload: carts.data,
      isLoaded: true,
      error: null,
    });
  } catch (err) {
    throw err;
  }
};
export const updateCart = (id, number) => async (dispatch) => {
  try {
    let res = await WebAPI.updateCart(id, number);
    dispatch({
      type: UPDATE_CART,
      payload: res.data,
      isLoaded: true,
    });
    dispatch(setAlert('Updated cart successfully!', 'success'));
    dispatch(allCarts());
  } catch (error) {
    dispatch({
      type: SET_ALERT,
    });
  }
};
export const removeCart = (id) => (dispatch) => {
  WebAPI.removeCart(id)
    .then((res) => {
      dispatch({
        type: REMOVE_CART_BY_ID,
        payload: res.data,
        isLoaded: true,
        error: null,
      });
      dispatch(setAlert('Remove to cart successfully!', 'success'));
      dispatch(allCarts());
    })
    .catch((err) => {});
};

export const removeManyCarts = (cartIds) => (dispatch) => {
  WebAPI.removeManyCarts(cartIds)
    .then((res) => {
      dispatch({
        type: REMOVE_CART_BY_IDS,
        payload: res.data,
        isLoaded: true,
        error: null,
      });
      dispatch(allCarts());
      dispatch(openCart(false));
    })
    .catch((err) => {});
};
