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
  CREATE_ITEM,
  CREATE_ITEM_FAILED,
  UPDATE_ITEM,
  UPDATE_ITEM_FAIL,
  FETCH_ITEMS_BY_USER_ID,
  FETCH_LAST_PRODUCTS,
  DELETE_ITEM_FAIL,
} from './types';
import { setAlert } from './alert';

export const fetchLastProducts = (cancelToken) => async (dispatch) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
      // cancelToken,
    },
  };
  try {
    let items = await axios.get(
      'http://10.0.0.5:4000/api/item/lastproducts',
      config,
    );
    dispatch({
      type: FETCH_LAST_PRODUCTS,
      lastProducts: items.data,
    });
  } catch (err) {
    throw err;
  }
};
export const fetchItems = () => async (dispatch, getState) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    let items = await axios.get('http://10.0.0.5:4000/api/item/all', config);
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

export const CreateItem = (product, history, userId) => (dispatch) => {
  axios
    .post('http://10.0.0.5:4000/api/item/new', product, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      dispatch(fetchItemsByUserId());
      dispatch({
        type: CREATE_ITEM,
        payload: response,
      });
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
  axios
    .get(`http://10.0.0.5:4000/api/item/s/search?`, {
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
  let config = {
    headers: {
      'content-type': 'application/json',
    },
  };

  axios
    .get(`http://10.0.0.5:4000/api/item/${id}`, config)
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

export const removeItemById = (id, userId, history) => (dispatch) => {
  console.log(userId);
  let config = {
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      userId: userId,
    },
  };

  axios
    .delete(`http://10.0.0.5:4000/api/item/${id}?`, config)
    .then(() => {
      dispatch({
        type: REMOVE_ITEM_BY_ID,
        payload: id,
      });
      history.push('/myproducts');
      dispatch(setAlert('Delete Item successfully!', 'success'));
      dispatch(fetchLastProducts());
      dispatch(fetchItems());
    })
    .catch((error) => {
      const errors = error.response.data;
      if (errors) {
        dispatch(setAlert(errors.error, 'warning'));
      }
      dispatch({
        type: DELETE_ITEM_FAIL,
      });
    });
};

export const fetchItemsByUserId = (id, cancelToken) => async (dispatch) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
    },
    cancelToken: cancelToken, // 2nd step
  };
  try {
    let itemsByUserId = await axios.get(
      `http://10.0.0.5:4000/api/item/user/items/${id}`,
      config,
    );

    await dispatch({
      type: FETCH_ITEMS_BY_USER_ID,
      payload: itemsByUserId.data,
      isLoaded: true,
    });
  } catch (error) {
    throw error;
  }
};

export const updateItem = (id, state, userId) => async (dispatch) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    let data = await axios.put(`http://10.0.0.5:4000/api/item/${id}`, state, {
      config,
    });
    dispatch({
      type: UPDATE_ITEM,
      payload: data.data,
      isLoaded: true,
    });
    dispatch(setAlert('Updated cart successfully!', 'success'));
    dispatch(fetchItems());
    dispatch(fetchItemsByUserId(userId));
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

export const addToCart = (id) => async (dispatch) => {
  try {
    await axios
      .post(`http://10.0.0.5:4000/api/item/add-to-cart/${id}`, {
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
        dispatch(setAlert('Add to cart successfully!', 'success'));
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
      type: FAILED_ADD_TO_CART_BY_ID,
    });
  }
};

export const allCarts = (id, cancelToken) => async (dispatch) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
      cancelToken: cancelToken,
    },
  };
  try {
    let carts = await axios.get(
      `http://10.0.0.5:4000/api/item/cart/${id}`,
      config,
    );
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
  let config = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: number,
  };
  try {
    let res = await axios.put(
      `http://10.0.0.5:4000/api/item/updateCart/${id}`,
      number,
      config,
    );
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
    if (axios.isCancel(error)) {
      console.log('request cancelled');
    } else {
      console.log('some other reason');
      throw error;
    }
  }
};
export const removeCart = (id) => (dispatch) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .post(`http://10.0.0.5:4000/api/item/removecart/${id}`, config)
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
    .catch((err) => console.log(err));
};
