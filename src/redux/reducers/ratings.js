import {
  ADD_RATINGS_FAILED,
  ADD_RATINGS,
  FETCH_RATING,
  FETCH_ALL_GREATEST_RATINGS_AVERAGE,
  FETCH_ALL_GREATEST_RATINGS_AVERAGE_FAILED,
} from '../actions/types';

const initialState = {
  AddRatings: {},
  isLoaded: true,
  error: null,
  rating: {},
  ratings: [],
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
    case FETCH_ALL_GREATEST_RATINGS_AVERAGE:
      return {
        ...state,
        ratings: action.payload.data,
        isLoaded: true,
      };
    case FETCH_ALL_GREATEST_RATINGS_AVERAGE_FAILED:
      return state;
    default:
      return state;
  }
}
