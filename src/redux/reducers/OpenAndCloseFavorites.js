import { OPEN_FAVORITES_AND_CLOSING } from '../actions/types';
let initialState = {
  open: false,
};
export default (state = initialState, action) => {
  const { type, open } = action;

  switch (type) {
    case OPEN_FAVORITES_AND_CLOSING:
      return {
        ...state,
        open,
      };
    default:
      return state;
  }
};
