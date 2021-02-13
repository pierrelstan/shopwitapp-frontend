import {
  PAGES,
  LOADING_PAGE_SUCCESS,
  LOADING_PAGE_START,
} from '../actions/types';
let initialState = {
  page: 1,
  itemsPerPages: [],
  isLoadingPages: false,
};
export default (state = initialState, action) => {
  const { type, payload, page } = action;
  switch (type) {
    case PAGES:
      return {
        ...state,
        itemsPerPages: payload.data,
        page,
        isLoadingPages: true,
      };
    case LOADING_PAGE_START:
      return {
        ...state,
        isLoadingPages: false,
      };

    case LOADING_PAGE_SUCCESS:
      return {
        ...state,
        isLoadingPages: true,
      };

    default:
      return state;
  }
};
