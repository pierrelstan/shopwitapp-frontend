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
import { addScrollValues } from './redux/actions/scrollValues';
import store from './redux/store/store';
import Sell from './pages/Sell';
import EditItem from './pages/EditItem';
import Item from './pages/Item';

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
  alert: {
    display: 'grid',
    justifyContent: 'center',
  },
}));

function App(props) {
  const classes = useStyles();

  React.useEffect(() => {
    store.dispatch(loadUser());
    // store.dispatch(allCarts);

    // setIsLoading(false);
  }, []);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [props.values]);

  const handleScroll = () => {
    props.addScrollValues(window.pageYOffset);
  };

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
          <ProtectedRoutes exact path='/item/new' component={Sell} />
          <ProtectedRoutes exact path='/item/update/:id' component={EditItem} />
          <ProtectedRoutes exact path='/item/:id' component={Item} />
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
    values: state.scrollValues.values,
    // carts: state.RootCarts.allCarts,
    logout: logout,
  };
};

export default connect(mapStateToProps, { addScrollValues })(App);
