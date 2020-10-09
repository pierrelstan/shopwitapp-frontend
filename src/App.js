import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Home from './pages/home';
import Navbar from './components/Navbar';
import AuthLinks from './components/AuthLinks';
import GuestLinks from './components/GuestLinks';
import { loadUser, logout } from './redux/actions/auth';
import Login from './pages/Login';
import Profile from './pages/profile';
import NoMatch from './components/NoMatch';
import Alert from './components/Alert';
import SignUp from './pages/SignUp';
import ProtectedRoutes from './components/protectedRoutes/Protected';

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
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
  alert: {
    display: 'grid',
    justifyContent: 'center',
  },
}));

function App(props) {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.root}>
        <Navbar>
          {!props.loading && (
            <Fragment>{props.active ? <AuthLinks /> : <GuestLinks />}</Fragment>
          )}
        </Navbar>
        <div className={classes.alert}>
          <Alert />
        </div>
        <Switch>
          <Route exact path='/' render={(props) => <Home {...props} />} />
          <Route exact path='/login' render={(props) => <Login {...props} />} />
          <Route
            exact
            path='/register'
            render={(props) => <SignUp {...props} />}
          />
          <ProtectedRoutes exact path='/profile' component={Profile} />
          <Route path='*' component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  const {
    auth: {
      isAuthenticated,
      user: { active },
    },
    loading,
    logout,
  } = state;
  return {
    isAuthenticated: isAuthenticated,
    loading: loading,
    active: active,
    // carts: state.RootCarts.allCarts,
    logout: logout,
  };
};

export default connect(mapStateToProps)(App);
