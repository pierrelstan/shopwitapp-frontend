import {
    ADD_RATINGS_FAILED,
    ADD_RATINGS,
    FETCH_RATING,
} from '../actions/types';

const initialState = {
    AddRatings: {},
    isLoaded: true,
    error: null,
    rating: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_RATINGS:
            return {
                ...state,
                AddRatings: action.payload.data,
                isLoaded: false,
                error: null,
            };

        case ADD_RATINGS_FAILED:
            return state;
        case FETCH_RATING:
            return {
                ...state,
                rating: action.payload.data,
                isLoaded: true,
                error: null,
            };
        default:
            return state;
    }
}
