import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import store, { persistor } from './redux/store/store';
import './index.css';
import 'swiper/swiper-bundle.css';
import App from './App';
import { theme } from './Theme/theme';
import * as serviceWorker from './serviceWorker';
import {
  fetchLastProducts,
  fetchItems,
  fetchCountsItems,
} from './redux/actions/ItemsActions';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { fetchAllGreatertRatingsAverage } from './redux/actions/ratings';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

store.dispatch(fetchLastProducts());
store.dispatch(fetchItems());
store.dispatch(fetchAllGreatertRatingsAverage());
store.dispatch(fetchCountsItems());

ReactDOM.render(
  <BrowserRouter>
    <Elements stripe={stripePromise}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SnackbarProvider maxSnack={1}>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </SnackbarProvider>
        </PersistGate>
      </Provider>
    </Elements>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
