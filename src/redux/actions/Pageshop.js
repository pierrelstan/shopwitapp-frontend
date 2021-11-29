import { PAGES, LOADING_PAGE_START, LOADING_PAGE_SUCCESS } from './types';
import WebAPI from '../../utils/service';

export const PagesShop = (page) => (dispatch) => {
  dispatch({
    type: LOADING_PAGE_START,
  });
  WebAPI.pagesShop(page)
    .then((items) =>
      Promise.all([
        dispatch({
          type: PAGES,
          payload: items,
          page: page,
          isLoaded: true,
          error: null,
        }),
        dispatch({
          type: LOADING_PAGE_SUCCESS,
        }),
      ]),
    )
    .catch((error) => ({
      error: error,
    }));
};
