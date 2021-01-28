import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import scrollValues from './scrollValues';
import items from './items';
import item from './item';
import pages from './pages';
import openCart from './openCart';
import carts from './RootCarts';
import favorites from './favorites';
import openFavoritesAndClosing from './OpenAndCloseFavorites';

const allReducers = combineReducers({
  auth,
  alert,
  scrollValues,
  items,
  item,
  pages,
  openCart,
  carts,
  favorites,
  openFavoritesAndClosing,
});
export default allReducers;
