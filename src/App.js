import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Home from './pages/home';
import Navbar from './components/Navbar';
import AuthLinks from './components/AuthLinks';
import GuestLinks from './components/GuestLinks';
import { loadUser, logout } from './redux/actions/auth';
import {
  allCarts,
  fetchItemsByUserId,
  fetchItems,
} from './redux/actions/ItemsActions';
import axios from 'axios';
import { allFavorites } from './redux/actions/favorites';
import Login from './pages/Login';
import Profile from './pages/profile';
import NoMatch from './components/NoMatch';
import Alert from './components/Alert';
import SignUp from './pages/SignUp';
import ProtectedRoutes from './components/protectedRoutes/Protected';
import store from './redux/store/store';
import Sell from './pages/Sell';
import EditItem from './pages/EditItem';
import Item from './pages/Item';
import Shop from './pages/shop';
import Woman from './pages/woman';
import Men from './pages/men';
import Shoes from './pages/shoes';
import NewPassword from './components/NewPassword';
import ResetPassword from './components/ResetPassword';
import MyProducts from './pages/MyProducts';
import Orders from './pages/orders';
import Dashboard from './pages/dashboard';
import Footer from './components/Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  hideOnDeskTop: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.up('600px')]: {
      display: 'none',
    },
  },
  centeredLogo: {
    textAlign: 'center',
  },
  logo: {
    textTransform: 'upperCase',
    textDecoration: 'none',
    color: '#333',
  },
  main: {
    flex: 1,
  },
}));

function App({
  allCarts,
  userId,
  allFavorites,
  fetchItemsByUserId,
  token,
  loading,
  active,
  isAuthenticated,
}) {
  const classes = useStyles();
  let fetchallCarts = React.useRef(() => {});
  let fetchallFavorites = React.useRef(() => {});
  let fetchallItemsByUserId = React.useRef(() => {});

  fetchallCarts.current = () => {
    const cancelTokenSource = axios.CancelToken.source();
    allCarts(userId, cancelTokenSource.token);
  };

  fetchallFavorites.current = () => {
    const cancelTokenSource = axios.CancelToken.source();
    allFavorites(userId, cancelTokenSource.token);
  };
  fetchallItemsByUserId.current = () => {
    const cancelTokenSource = axios.CancelToken.source();
    fetchItemsByUserId(userId, cancelTokenSource.token);
  };

  React.useEffect(() => {
    if (token !== null) {
      store.dispatch(loadUser());
      fetchallCarts.current();
      fetchallFavorites.current();
      fetchallItemsByUserId.current();
    }

    return () => {
      const cancelTokenSource = axios.CancelToken.source();
      cancelTokenSource.cancel();
    };
  }, [token]);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Router>
          {/* <ScrollOnT /> */}
          <div className={classes.main}>
            <Navbar>
              {active && <AuthLinks />}
              {!active && <GuestLinks />}
            </Navbar>

            <Alert />

            <Switch>
              <Route exact path='/' render={(props) => <Home {...props} />} />
              <Route
                exact
                path='/login'
                render={(props) => <Login {...props} />}
              />
              <Route
                exact
                path='/register'
                render={(props) => <SignUp {...props} />}
              />
              <ProtectedRoutes exact path='/profile' component={Profile} />
              <ProtectedRoutes exact path='/orders' component={Orders} />
              <ProtectedRoutes exact path='/dashboard' component={Dashboard} />
              <ProtectedRoutes exact path='/item/new' component={Sell} />
              <ProtectedRoutes
                exact
                path='/item/update/:id'
                component={EditItem}
              />
              <ProtectedRoutes exact path='/item/:id' component={Item} />
              <Route exact path='/newpassword/:id' component={NewPassword} />
              <ProtectedRoutes
                exact
                path='/myproducts'
                component={MyProducts}
              />
              <Route exact path='/login' component={Login} />
              <Route exact path='/resetpassword' component={ResetPassword} />
              <Route exact path='/shop' component={Shop} />
              <Route exact path='/woman' component={Woman} />
              <Route exact path='/men' component={Men} />
              <Route exact path='/shoes' component={Shoes} />
              <Route path='*' component={NoMatch} />
            </Switch>
          </div>
        </Router>
        {/* <MobileNavbar /> */}
        <Footer />
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const {
    auth: { isAuthenticated },
    loading,
    logout,
  } = state;
  return {
    isAuthenticated: isAuthenticated,
    loading: loading,
    active: state.auth.user ? state.auth.user.active : false,
    logout: logout,
    items: state.items,
    userId: state.auth.user ? state.auth.user._id : 0,
    token: state.auth.token,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    allCarts,
    loadUser,
    logout,
    fetchItems,
    allFavorites,
    fetchItemsByUserId,
  })(App),
);
