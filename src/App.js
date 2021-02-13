import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Home from './pages/home';
import Navbar from './components/Navbar';
import AuthLinks from './components/AuthLinks';
import GuestLinks from './components/GuestLinks';
import { getProfile } from './redux/actions/auth';
import { allFavorites } from './redux/actions/favorites';
import Login from './pages/Login';
import Profile from './pages/profile';
import NoMatch from './components/NoMatch';
import Alert from './components/Alert';
import SignUp from './pages/SignUp';
import ProtectedRoutes from './components/protectedRoutes/Protected';
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
import { fetchItemsByUserId } from './redux/actions/ItemsActions';
import { allCarts } from './redux/actions/carts';
import store from './redux/store/store';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
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

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { token, active } = useSelector((state) => ({
    token: state.auth.token,
    active: state.auth.user ? state.auth.user.active : false,
  }));

  React.useEffect(() => {
    if (token) {
      store.dispatch(getProfile());
      dispatch(allFavorites());
      dispatch(allCarts());
      dispatch(fetchItemsByUserId());
    }
  }, [dispatch, token]);

  return (
    <div className={classes.root}>
      <Router>
        <Navbar>
          {active && <AuthLinks />}
          {!active && <GuestLinks />}
        </Navbar>
        <Alert />
        <div className={classes.main}>
          <Switch>
            <Route exact path='/' render={(props) => <Home {...props} />} />
            <Route path='/login' render={(props) => <Login {...props} />} />
            <Route
              exact
              path='/register'
              render={(props) => <SignUp {...props} />}
            />
            <ProtectedRoutes path='/profile' component={Profile} />
            <ProtectedRoutes path='/orders' component={Orders} />
            <ProtectedRoutes path='/dashboard' component={Dashboard} />
            <ProtectedRoutes path='/item/new' component={Sell} />
            <ProtectedRoutes path='/item/update/:id' component={EditItem} />
            <ProtectedRoutes path='/item/:id' component={Item} />
            <Route path='/newpassword/:id' component={NewPassword} />
            <ProtectedRoutes path='/myproducts' component={MyProducts} />
            <Route path='/login' component={Login} />
            <Route path='/resetpassword' component={ResetPassword} />
            <Route path='/shop' component={Shop} />
            <Route path='/woman' component={Woman} />
            <Route path='/men' component={Men} />
            <Route path='/shoes' component={Shoes} />
            <Route path='*' component={NoMatch} />
          </Switch>
        </div>
      </Router>
      <Footer />
      {/* <MobileNavbar /> */}
    </div>
  );
}

export default App;
