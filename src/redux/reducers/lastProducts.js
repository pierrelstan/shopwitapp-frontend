import {
  FETCH_LAST_PRODUCTS_START,
  FETCH_LAST_PRODUCTS_SUCCESS,
} from '../actions/types';

const initialState = {
  isLoadingLast10Products: false,
  lastProducts: [],
};

export default function (state = initialState, action) {
  const { lastProducts } = action;

  switch (action.type) {
    case FETCH_LAST_PRODUCTS_START:
      return { ...state, isLoadingLast10Products: true, lastProducts: [] };
    case FETCH_LAST_PRODUCTS_SUCCESS:
      return {
        ...state,
        lastProducts: [...lastProducts],
        isLoadingLast10Products: false,
      };
    default:
      return state;
  }
}
