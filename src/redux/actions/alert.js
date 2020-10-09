// import { v4 as uuidv4 } from 'uuid';
import nodeId from 'node-id';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertTypes, timeout = 1000) => (dispatch) => {
  const id = nodeId();

  dispatch({
    type: SET_ALERT,
    payload: { msg, alertTypes, id },
  });

  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      }),
    timeout,
  );
};
