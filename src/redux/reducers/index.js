import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import scrollValues from './scrollValues';
import items from './items';
import item from './item';
import pages from './pages';
import openCart from './openCart';

const allReducers = combineReducers({
  auth,
  alert,
  scrollValues,
  items,
  item,
  pages,
  openCart,
});
export default allReducers;
