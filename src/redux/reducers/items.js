import {
  FETCH_ITEMS,
  NEW_ITEM,
  REMOVE_ITEM_BY_ID,
  FETCH_ITEM_BY_ID,
} from '../actions/types';

const initialState = {
  items: [],
  isLoaded: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEMS:
      return {
        ...state,
        items: action.payload.data,
        isLoaded: true,
      };

    case NEW_ITEM:
      return {
        ...state,
        itemById: action.payload,
      };
    case REMOVE_ITEM_BY_ID:
      return {
        ...state,
        removeById: action.payload,
        isLoaded: false,
        error: null,
      };

    default:
      return state;
  }
}
