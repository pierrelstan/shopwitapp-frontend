import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import localforage from 'localforage';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import allReducers from '../reducers/index';

const initialState = {};

const middleware = [thunk];

const persistConfig = {
  key: 'root',
  storage: localforage,
  whitelist: ['carts', 'favorites', 'items', 'products', 'auth', 'item'], // only navigation will be persisted
};

const persistedReducer = persistReducer(persistConfig, allReducers);

const store = createStore(
  persistedReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

export let persistor = persistStore(store);

export default store;
