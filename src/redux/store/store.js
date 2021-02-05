import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import allReducers from '../reducers/index';

const initialState = {};

const middleware = [thunk];

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'carts', 'favorites'],
};

const persistedReducer = persistReducer(persistConfig, allReducers);

const composeEnhancers = composeWithDevTools({});
const store = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware)),
);

export let persistor = persistStore(store);

export default store;
