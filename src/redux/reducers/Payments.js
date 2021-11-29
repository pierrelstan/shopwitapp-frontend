import {
  PAYMENTS_START,
  PAYMENTS_SUCCESS,
  PAYMENTS_FAILED,
} from '../actions/types';

const initialState = {
  isLoading: false,
  orderPayments: [],
};

export default function (state = initialState, action) {
  const { orderPayments } = action;
  switch (action.type) {
    case PAYMENTS_START:
      return {
        ...state,
        isLoading: true,
      };
    case PAYMENTS_SUCCESS:
      return {
        ...state,
        orderPayments: orderPayments,
        isLoading: false,
      };
    case PAYMENTS_FAILED:
      return state;

    default:
      return state;
  }
}
