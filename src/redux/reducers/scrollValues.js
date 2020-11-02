import { ADD_SCROLL_VALUES } from '../actions/types';
let initialState = {
  values: 0,
};
export default (state = initialState, action) => {
  const { type, values } = action;
  switch (type) {
    case ADD_SCROLL_VALUES:
      return {
        ...state,
        values,
      };
    default:
      return state;
  }
};
