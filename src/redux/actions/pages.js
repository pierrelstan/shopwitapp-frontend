import axios from 'axios';
import { PAGES } from './types';
import { fetchItems } from './ItemsActions';

export const pagesControlled = (page, cancelToken) => (dispatch) => {
  axios
    .get(`http://10.0.0.5:4000/api/item/page/${page}`, {
      cancelToken: cancelToken,
    })
    .then(
      (items) =>
        dispatch({
          type: PAGES,
          payload: items,
          page: page,
          isLoaded: true,
          error: null,
        }),
      dispatch(fetchItems()),
    )
    .catch((error) => ({
      error: error,
    }));
};
