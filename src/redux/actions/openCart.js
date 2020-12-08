import { OPEN_CART } from './types';

export const openCart = (value) => (dispatch) => {
  dispatch({
    type: OPEN_CART,
    cart: value,
  });
};
