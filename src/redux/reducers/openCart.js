import { OPEN_CART } from '../actions/types';
let initialState = {
  cart: false,
};
export default (state = initialState, action) => {
  const { type, cart } = action;

  switch (type) {
    case OPEN_CART:
      return {
        ...state,
        cart,
      };
    default:
      return state;
  }
};
