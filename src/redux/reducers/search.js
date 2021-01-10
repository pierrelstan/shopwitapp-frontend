import {SEARCH_ITEMS} from '../actions/types';

const initialState = {
  description: 'Search items',
  search: [],
  value: '',
  dataSearch: [],
  isLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_ITEMS:
      const {value} = action;

      return {
        ...state,
        search: action.payload.data,
        value,
        isLoaded: true,
      };

    // return {
    //   ...state,
    //   search: action.payload.data,
    //   isLoaded: true,
    // };

    default:
      return state;
  }
}
