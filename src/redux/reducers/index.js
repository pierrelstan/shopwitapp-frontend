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
import myProducts from './myProducts';
import lastProducts from './lastProducts';
import openFavoritesAndClosing from './OpenAndCloseFavorites';

const allReducers = combineReducers({
  lastProducts,
  auth,
  alert,
  scrollValues,
  items,
  myProducts,
  item,
  pages,
  openCart,
  carts,
  favorites,
  openFavoritesAndClosing,
});
export default allReducers;
