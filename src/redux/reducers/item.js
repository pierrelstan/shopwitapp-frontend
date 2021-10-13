import { FETCH_ITEM_BY_ID } from '../actions/types';

const initialState = {
  description: 'Fetch one Item',
  isLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEM_BY_ID:
      return {
        ...state,
        ...action.payload.data,
        isLoaded: true,
      };
    default:
      return state;
  }
}
