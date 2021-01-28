import {
  ADD_TO_CART_BY_ID,
  REMOVE_CART_BY_ID,
  FETCH_CARTS,
  LOGOUT,
  UPDATE_CART,
  UPDATE_CART_FAIL,
  FAILED_ADD_TO_CART_BY_ID,
} from '../actions/types';

const initialState = {
  isLoaded: true,
  error: null,
  addCart: [],
  allCarts: [],
  removeCart: [],
  updateCart: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART_BY_ID:
      return {
        ...state,
        addCart: action.payload.data,
        isLoaded: false,
        error: null,
      };

    case REMOVE_CART_BY_ID:
      return {
        ...state,
        removeCart: action.payload,
        isLoaded: false,
        error: null,
      };

    case FETCH_CARTS:
      return {
        ...state,
        allCarts: [...action.payload],
        isLoaded: false,
      };
    case UPDATE_CART:
      return {
        ...state,
        updateCart: action.payload,
        isLoaded: false,
      };
    case LOGOUT:
      return {
        ...state,
        allCarts: [],
      };
    case UPDATE_CART_FAIL:
      return state;
    case FAILED_ADD_TO_CART_BY_ID:
      return {
        ...state,
      };
    default:
      return state;
  }
}
