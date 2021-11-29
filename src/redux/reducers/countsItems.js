import {
  FETCH_COUNTS_ITEMS_START,
  FETCH_COUNTS_ITEMS_SUCCESS,
} from '../actions/types';

const initialState = {
  isLoading: false,
  countsItems: [],
};

export default function (state = initialState, action) {
  const { countsItems } = action;

  switch (action.type) {
    case FETCH_COUNTS_ITEMS_START:
      return { ...state, isLoading: true, countsItems: [] };
    case FETCH_COUNTS_ITEMS_SUCCESS:
      return {
        ...state,
        countsItems: countsItems,
        isLoading: false,
      };

    default:
      return state;
  }
}
