import {
  FETCH_FAVORITES,
  ADD_FAVORITES,
  REMOVE_FAVORITES,
  LOGOUT,
} from '../actions/types';

const initialState = {
  allFavorites: [],
  addFavorites: [],
  removeFavorites: [],
  isLoaded: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_FAVORITES:
      return {
        ...state,
        addFavorites: action.payload.data,
        isLoaded: false,
        error: null,
      };

    case FETCH_FAVORITES:
      return {
        ...state,
        allFavorites: [...action.payload],
        isLoaded: true,
      };

    case REMOVE_FAVORITES:
      return {
        ...state,
        removeFavorites: action.payload,
        isLoaded: false,
        error: null,
      };
    case LOGOUT:
      return {
        ...state,
        allCarts: [],
      };

    default:
      return state;
  }
}
