import jwtDecode from 'jwt-decode';
import store from '../store/store';
import { ADD_RATINGS, ADD_RATINGS_FAILED, FETCH_RATING } from './types';
import { setAlert } from './alert';

import axiosService from '../../utils/axiosService';
import WebAPI from '../../utils/service';

export const addRatings = (id, newValue) => async (dispatch) => {
    try {
        let data = await WebAPI.addRatings(id, newValue);
        dispatch({
            type: ADD_RATINGS,
            payload: data,
            isLoaded: true,
        });

        dispatch(fetchRatingById(id));
    } catch (err) {
        dispatch({
            type: ADD_RATINGS_FAILED,
        });
    }
};

export const fetchRatingById = (id) => (dispatch) => {
    WebAPI.fetchRatingById(id)
        .then((item) => {
            dispatch({
                type: FETCH_RATING,
                payload: item,
                isLoaded: true,
                error: null,
            });
        })
        .catch((error) => {});
};
