import { OPEN_FAVORITES_AND_CLOSING } from './types';

export const openFavoritesAndClosing = (value) => (dispatch) => {
  dispatch({
    type: OPEN_FAVORITES_AND_CLOSING,
    open: value,
  });
};
