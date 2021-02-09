import { isEmptyArray } from 'formik';
import { FETCH_ITEMS_BY_USER_ID } from '../actions/types';

const initialState = {
  myProducts: [],
  isLoaded: false,
  error: null,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEMS_BY_USER_ID:
      return {
        ...state,
        myProducts: [...action.payload],
        isLoaded: true,
        error: null,
      };

    default:
      return state;
  }
}
