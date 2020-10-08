import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
const allReducers = combineReducers({
  auth,
  alert,
});
export default allReducers;
