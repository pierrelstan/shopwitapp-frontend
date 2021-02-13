import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import allReducers from '../reducers/index';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  allReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export let persistor = persistStore(store);

export default store;
