import {
  ADD_RATINGS,
  ADD_RATINGS_FAILED,
  FETCH_RATING,
  FETCH_ALL_GREATEST_RATINGS_AVERAGE,
  FETCH_ALL_GREATEST_RATINGS_AVERAGE_FAILED,
} from './types';
import WebAPI from '../../utils/service';
import { setAlert } from './alert';

export const addRatings = (id, newValue) => async (dispatch) => {
  try {
    let data = await WebAPI.addRatings(id, newValue);
    dispatch({
      type: ADD_RATINGS,
      payload: data,
      isLoaded: true,
    });

    dispatch(fetchRatingById(id));
    dispatch(fetchAllGreatertRatingsAverage());
    dispatch(setAlert(data.data.message, 'success'));
  } catch (err) {
    dispatch({
      type: ADD_RATINGS_FAILED,
    });
  }
};

export const fetchRatingById = (id) => (dispatch) => {
  WebAPI.fetchRatingById(id)
    .then((data) => {
      dispatch({
        type: FETCH_RATING,
        payload: data,
        isLoaded: true,
        error: null,
      });
    })
    .catch((error) => {});
};

export const fetchAllGreatertRatingsAverage = (id) => (dispatch) => {
  WebAPI.fetchAllGreatertRatingsAverage()
    .then((item) => {
      dispatch({
        type: FETCH_ALL_GREATEST_RATINGS_AVERAGE,
        payload: item,
        isLoaded: true,
        error: null,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_ALL_GREATEST_RATINGS_AVERAGE_FAILED,
      });
    });
};
