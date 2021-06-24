import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
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
import orderPayments from './order';
import ratings from './ratings';

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token', 'user'],
    blacklist: ['item'],
};

const allReducers = combineReducers({
    lastProducts,
    auth: persistReducer(authPersistConfig, auth),
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
    orderPayments,
    ratings,
});
export default allReducers;
