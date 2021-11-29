import {
  ADD_PAYMENTS,
  ADD_PAYEMNTS_FAILED,
  FETCH_ORDER_BY_USER_ID,
} from './types';
import WebAPI from '../../utils/service';

export const AddPayments = (token) => (dispatch) => {
  WebAPI.addPayments(token)
    .then((response) => {
      dispatch({
        type: ADD_PAYMENTS,
        payload: response,
      });

      response.json().then((data) => {
        alert(`We are in business, ${data.email}`);
      });
    })
    .catch((err) => {
      dispatch({
        type: ADD_PAYEMNTS_FAILED,
        payload: err,
      });
    });
};

export const fetchOrderByUserId = (id) => (dispatch) => {
  WebAPI.fetchOrderByUserId(id)
    .then((item) => {
      dispatch({
        type: FETCH_ORDER_BY_USER_ID,
        payload: item,
        isLoaded: true,
        error: null,
      });
    })
    .catch((error) => {});
};
