import { PAGES } from '../actions/types';
let initialState = {
  page: 1,
  itemsPerPages: [],
};
export default (state = initialState, action) => {
  const { type, payload, page } = action;
  switch (type) {
    case PAGES:
      return {
        ...state,
        itemsPerPages: payload.data,
        page,
      };
    default:
      return state;
  }
};
