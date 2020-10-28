import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import scrollValues from './scrollValues';
const allReducers = combineReducers({
  auth,
  alert,
  scrollValues,
});
export default allReducers;
