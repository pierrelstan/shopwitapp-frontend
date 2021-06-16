import jwtDecode from 'jwt-decode';
import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOAD,
    AUTH_ERROR,
    LOGIN_START,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT,
    NEW_PASSWORD,
    NEW_PASSWORD_FAIL,
    UPDATE_PROFILE,
    UPDATE_PROFILE_FAIL,
    REMOVE_UPDATE_SUCCESS_MESSAGE,
} from './types';
import store from '../store/store';
import { setAlert } from './alert';
import axiosService from '../../utils/axiosService';
import WebAPI from '../../utils/service';

// Load user
export const getProfile = () => async (dispatch) => {
    try {
        let token = store.getState().auth.token;
        let decodeToken = jwtDecode(token);
        console.log(decodeToken);
        let userId = decodeToken.user.userId;

        const expirationTime = decodeToken.exp;
        if (expirationTime < Date.now() / 1000) {
            dispatch({
                type: AUTH_ERROR,
            });
        }
        if (token !== null) {
            let data = await WebAPI.getProfile(userId);
            dispatch({
                type: USER_LOAD,
                payload: data.data,
            });
        }
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

// register user
export const signUp = (User) => async (dispatch) => {
    try {
        await WebAPI.signUp(User).then((res) => {
            const data = res.data;
            return Promise.all([
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: data,
                }),
                dispatch(getProfile()),
            ]);
        });
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL,
        });
    }
};

// Login user
export const Log_in = (user) => (dispatch) => {
    try {
        WebAPI.Log_in(user)
            .then((res) => {
                Promise.all([
                    dispatch({
                        type: LOGIN_START,
                    }),
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: res.data,
                    }),
                    dispatch(getProfile()),
                ]);
            })
            .catch((error) => {
                // error handling
                // let errors = error.response.data.errors;
                // errors.forEach((error) =>
                //     dispatch(setAlert(error.msg, 'warning'))
                // );

                dispatch({
                    type: LOGIN_FAILURE,
                });
            });
    } catch (e) {}
};

// Log out clear profile

export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT,
    });
};

export const newPassWord = (token, state, props) => async (dispatch) => {
    try {
        let res = await axiosService.post(
            `/api/auth/newpassword/${token}`,
            state
        );

        dispatch({
            type: NEW_PASSWORD,
            payload: res.data,
        });

        props.history.push('/');
    } catch (error) {
        dispatch({
            type: NEW_PASSWORD_FAIL,
        });
    }
};

export const editProfile = (User) => async (dispatch) => {
    const token = store.getState().auth.token;
    const { user } = jwtDecode(token);
    let USER_ID = user.userId;
    try {
        let res = await WebAPI.editProfile(USER_ID, User);
        if (res) {
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data,
                update: true,
            });
            dispatch(setAlert('Update profile successfully!', 'success'));
            setTimeout(() => {
                dispatch({
                    type: REMOVE_UPDATE_SUCCESS_MESSAGE,
                    update: false,
                });
            }, 3000);
            dispatch(getProfile());
        } else {
            dispatch(setAlert('Please connect to internet!', 'dander'));
        }
    } catch (error) {
        // error handling
        let errors = error.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
            dispatch({
                type: UPDATE_PROFILE_FAIL,
            });
        }
    }
};
