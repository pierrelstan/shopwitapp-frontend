import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import AuthLinks from './components/AuthLinks';
import GuestLinks from './components/GuestLinks.tsx';
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
import Sneakers from './pages/sneakers';
import NewPassword from './components/NewPassword';
import ResetPassword from './components/ResetPassword';
import MyProducts from './pages/MyProducts';
import Orders from './pages/orders';
import Favorites from './pages/favorites';
import Footer from './components/Footer';
import { fetchItemsByUserId } from './redux/actions/ItemsActions';
import { allCarts } from './redux/actions/carts';
import axiosService from './utils/axiosService';
import { Box, CssBaseline } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight:'100vh',
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

function App_depre() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { token, active } = useSelector((state) => ({
    token: state.auth.token,
    active: state.auth.user ? state.auth.user.active : false,
  }));

  useEffect(() => {
    if (token) {
      Promise.all([
        dispatch(getProfile()),
        dispatch(allFavorites()),
        dispatch(allCarts()),
        dispatch(fetchItemsByUserId()),
      ]);
    }
    return () => {
      axiosService();
    };
  }, [dispatch, token]);

  return (
    <Box  className={classes.root}>
      <CssBaseline/>
      <Router basename={process.env.PUBLIC_URL}>
        <Alert />
        <Navbar>
          {active && <AuthLinks />}
          {!active && <GuestLinks />}
        </Navbar>

        <div className={classes.main}>
          <Routes>
            <Route exact path='/' render={(props) => <Home {...props} />} />
            <Route path='/login' render={(props) => <Login {...props} />} />
            <Route
              exact
              path='/register'
              render={(props) => <SignUp {...props} />}
            />
            <ProtectedRoutes exact path='/profile' component={Profile} />
            <ProtectedRoutes exact path='/orders/:id' component={Orders} />
            <ProtectedRoutes exact path='/item/new' component={Sell} />
            <ProtectedRoutes
              exact
              path='/item/update/:id'
              component={EditItem}
            />
            <ProtectedRoutes exact path='/item/:id' component={Item} />
            <Route exact path='/newpassword/:id' component={NewPassword} />
            <ProtectedRoutes exact path='/myproducts' component={MyProducts} />
            <ProtectedRoutes exact path='/favorites' component={Favorites} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/resetpassword' component={ResetPassword} />
            <Route exact path='/shop' component={Shop} />
            <Route exact path='/women' component={Woman} />
            <Route exact path='/men' component={Men} />
            <Route exact path='/sneakers' component={Sneakers} />
            <Route exact path='*' component={NoMatch} />
          </Routes>
        </div>
      </Router>
      <Footer />
      {/* <MobileNavbar /> */}
    </Box>
  );
}

export default App;
