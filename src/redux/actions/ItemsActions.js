import jwtDecode from 'jwt-decode';
import store from '../store/store';
import {
  FETCH_ITEMS,
  SEARCH_ITEMS,
  CLEAR_SEARCH_ITEMS,
  FETCH_ITEM_BY_ID,
  REMOVE_ITEM_BY_ID,
  CREATE_ITEM,
  CREATE_ITEM_FAILED,
  UPDATE_ITEM,
  UPDATE_ITEM_FAIL,
  FETCH_ITEMS_BY_USER_ID,
  DELETE_ITEM_FAIL,
  FETCH_LAST_PRODUCTS_START,
  FETCH_LAST_PRODUCTS_SUCCESS,
} from './types';
import { setAlert } from './alert';
import axiosService from '../../utils/axiosService';
import WebAPI from '../../utils/service';

export const fetchLastProducts = (cancelToken) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_LAST_PRODUCTS_START,
    });
    let items = await WebAPI.fetchLastProducts();

    dispatch({
      type: FETCH_LAST_PRODUCTS_SUCCESS,
      lastProducts: items.data,
    });
  } catch (err) {}
};
export const fetchItems = () => async (dispatch, getState) => {
  try {
    let items = await WebAPI.fetchItems();
    dispatch({
      type: FETCH_ITEMS,
      payload: items.data,
      isLoaded: true,
      error: null,
    });
  } catch (err) {
    throw err;
  }
};

export const CreateItem = (product, history) => (dispatch) => {
  const token = store.getState().auth.token;
  const { user } = jwtDecode(token);
  let USER_ID = user.userId;

  WebAPI.createItem(product, USER_ID)
    .then((response) => {
      dispatch(fetchLastProducts());
      dispatch(fetchItemsByUserId());
      dispatch({
        type: CREATE_ITEM,
        payload: response,
      });
      dispatch(setAlert('Create item Successfully!', 'success'));
      history.push(`/myproducts`);
    })
    .catch((err) => {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'warning')));
      }
      dispatch({
        type: CREATE_ITEM_FAILED,
        payload: err,
      });
    });
};
export const searchItems = (data) => (dispatch) => {
  const { search } = data;
  axiosService
    .get(`/api/item/s/search?`, {
      params: {
        title: `${search}`,
      },
    })
    .then((items) => {
      if (search === '') {
        dispatch({
          type: SEARCH_ITEMS,
          payload: [],
          value: '',
          isLoaded: true,
          error: null,
        });
      } else {
        dispatch({
          type: SEARCH_ITEMS,
          payload: items,
          value: search,

          isLoaded: true,
          error: null,
        });
      }
    })
    .catch((error) => ({
      error: error,
    }));
};

export const clearSearchItems = () => (dispatch) => {
  dispatch({
    type: CLEAR_SEARCH_ITEMS,
    isLoaded: false,
  });
};
export const fetchItemById = (id) => (dispatch) => {
  WebAPI.fetchItemById(id)
    .then((item) =>
      dispatch({
        type: FETCH_ITEM_BY_ID,
        payload: item,
        isLoaded: true,
        error: null,
      }),
    )
    .catch((error) => {
      console.log(error);
    });
};

export const removeItemById = (id) => async (dispatch) => {
  try {
    const token = store.getState().auth.token;
    const { user } = jwtDecode(token);
    let USER_ID = user.userId;

    let data = await WebAPI.removeItemById(id, USER_ID);
    Promise.all([
      dispatch({
        type: REMOVE_ITEM_BY_ID,
        payload: data.data,
      }),
      dispatch(setAlert(data.data.message, 'success')),
      dispatch(fetchLastProducts()),
      dispatch(fetchItemsByUserId()),
    ]);
  } catch (error) {
    const errors = error.response.data;
    console.log(errors);
    if (errors) {
      dispatch(setAlert(errors.error, 'warning'));
    }
    dispatch({
      type: DELETE_ITEM_FAIL,
    });
  }
};

export const fetchItemsByUserId = () => async (dispatch) => {
  const token = store.getState().auth.token;
  const { user } = jwtDecode(token);
  let USER_ID = user.userId;

  try {
    let itemsByUserId = await WebAPI.fetchItemsByUserId(USER_ID);

    await dispatch({
      type: FETCH_ITEMS_BY_USER_ID,
      payload: itemsByUserId.data,
      isLoaded: true,
    });
  } catch (error) {
    throw error;
  }
};

export const updateItem = (id, state, history) => async (dispatch) => {
  try {
    const token = store.getState().auth.token;
    const { user } = jwtDecode(token);
    let USER_ID = user.userId;
    let data = await WebAPI.updateItem(id, state, USER_ID);

    dispatch({
      type: UPDATE_ITEM,
      payload: data.data,
      isLoaded: true,
    });
    history.push(`/myproducts/${USER_ID}`);
    dispatch(setAlert('Updated cart successfully!', 'success'));
  } catch (error) {
    const errors = error.response.data;
    if (errors) {
      dispatch(setAlert(errors.error, 'warning'));
    }
    dispatch({
      type: UPDATE_ITEM_FAIL,
    });
  }
};
