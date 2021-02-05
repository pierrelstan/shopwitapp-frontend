import { FETCH_LAST_PRODUCTS } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  const { lastProducts } = action;

  switch (action.type) {
    case FETCH_LAST_PRODUCTS:
      return {
        ...state,
        lastProducts: [...lastProducts],
      };

    default:
      return state;
  }
}
