import axios from 'axios';
import {
  FETCH_ITEMS,
  SEARCH_ITEMS,
  CLEAR_SEARCH_ITEMS,
  FETCH_ITEM_BY_ID,
  REMOVE_ITEM_BY_ID,
  ADD_TO_CART_BY_ID,
  FAILED_ADD_TO_CART_BY_ID,
  FETCH_CARTS,
  REMOVE_CART_BY_ID,
  UPDATE_CART,
  SET_ALERT,
} from './types';
import { setAlert } from './alert';

export const fetchItems = () => (dispatch) => {
  axios
    .get(`http://localhost:4000/item/all`)
    .then((items) =>
      dispatch({
        type: FETCH_ITEMS,
        payload: items,
        isLoaded: true,
        error: null,
      }),
    )
    .catch((error) => ({
      error: error,
    }));
};

export const searchItems = (data) => (dispatch) => {
  const { search } = data;
  axios
    .get(`http://localhost:4000/item/s/search?`, {
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
  console.log(id);
  let config = {
    // method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  };

  axios
    .get(`http://localhost:4000/item/${id}`, config)
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

export const removeItemById = (id) => (dispatch) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .delete(`http://localhost:4000/item/${id}`, config)
    .then(() => {
      dispatch({
        type: REMOVE_ITEM_BY_ID,
        payload: id,
      });
    })
    .catch((error) => ({
      error: error,
    }));
};

export const addToCart = (id) => async (dispatch) => {
  try {
    await axios
      .post(`http://localhost:4000/item/add-to-cart/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((data) => {
        dispatch({
          type: ADD_TO_CART_BY_ID,
          payload: data,
          isLoaded: true,
        });

        dispatch(allCarts());
      });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: FAILED_ADD_TO_CART_BY_ID,
    });
  }
};

export const allCarts = (userId) => (dispatch) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  axios
    .get(`http://localhost:4000/item/cart/${userId}`, config)
    .then((response) => {
      dispatch({
        type: FETCH_CARTS,
        payload: response.data,
        isLoaded: true,
        error: null,
      });
    });
};
export const updateCart = (id, number) => async (dispatch) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: number,
  };
  try {
    let res = await axios.put(
      `http://localhost:4000/item/updateCart/${id}`,
      number,
      config,
    );
    dispatch({
      type: UPDATE_CART,
      payload: res.data,
      isLoaded: true,
    });
    dispatch(allCarts());
  } catch (error) {
    dispatch({
      type: SET_ALERT,
    });
  }
};
export const removeCart = (id) => (dispatch) => {
  let config = {
    // method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .post(`http://localhost:4000/item/removecart/${id}`, config)
    // .then((res) => res.json)
    .then((res) => {
      dispatch({
        type: REMOVE_CART_BY_ID,
        payload: res.data,
        isLoaded: true,
        error: null,
      });

      dispatch(allCarts());
    });
};
