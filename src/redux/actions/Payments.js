import { PAYMENTS_START, PAYMENTS_SUCCESS, PAYMENTS_FAILED } from './types';
import WebAPI from '../../utils/service';

export const CreateOrderPayments =
  (cartIds, Payment, id, IdItems) => async (dispatch) => {
    try {
      dispatch({
        type: PAYMENTS_START,
      });
      let items = await WebAPI.createOrderPayments(
        cartIds,
        Payment,
        id,
        IdItems,
      );

      dispatch({
        type: PAYMENTS_SUCCESS,
        order: items.data,
      });
    } catch (err) {
      dispatch({
        type: PAYMENTS_FAILED,
      });
    }
  };
