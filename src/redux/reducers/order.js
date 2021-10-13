import {
  ADD_PAYMENTS,
  ADD_FAVORITES_FAILED,
  FETCH_ORDER_BY_USER_ID,
} from '../actions/types';

const initialState = {
  orderPayments: {},
  orders: [],
  isLoading: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_PAYMENTS:
      return {
        ...state,
        orderPayments: action.payload.data,
        isLoaded: true,
        error: null,
      };

    case FETCH_ORDER_BY_USER_ID:
      return {
        ...state,
        orders: action.payload.data,
        isLoading: true,
      };

    default:
      return state;
  }
}
