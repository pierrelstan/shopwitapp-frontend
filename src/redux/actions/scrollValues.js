import { ADD_SCROLL_VALUES } from './types';

export const addScrollValues = (value) => (dispatch) => {
  dispatch({
    type: ADD_SCROLL_VALUES,
    values: value,
  });
};
