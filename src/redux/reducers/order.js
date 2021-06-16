import { ADD_PAYMENTS, ADD_FAVORITES_FAILED } from '../actions/types';

const initialState = {
    orderPayments: {},
    isLoaded: false,
    error: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_PAYMENTS:
            return {
                ...state,
                orderPayments: action.payload.data,
                isLoaded: true,
                error: null,
            };

        default:
            return state;
    }
}
