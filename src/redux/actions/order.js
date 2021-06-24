import { ADD_PAYMENTS, ADD_PAYEMNTS_FAILED } from './types';
import WebAPI from '../../utils/service';

export const AddPayments = (token) => (dispatch) => {
    WebAPI.addPayments(token)
        .then((response) => {
            console.log(response);
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
