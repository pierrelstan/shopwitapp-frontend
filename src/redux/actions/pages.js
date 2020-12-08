import axios from 'axios';
import { PAGES } from './types';
import { fetchItems } from './ItemsActions';

// export const pagesControlled = (value) => (dispatch) => {
//   dispatch({
//     type: PAGES,
//     page: value,
//   });
// };

export const pagesControlled = (page) => (dispatch) => {
  axios
    .get(`http://localhost:4000/item/page/${page}`)
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
