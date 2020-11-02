import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import scrollValues from './scrollValues';
import items from './items';
import item from './item';

const allReducers = combineReducers({
  auth,
  alert,
  scrollValues,
  items,
  item,
});
export default allReducers;
