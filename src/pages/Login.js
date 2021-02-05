import React from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import { setAlert } from '../actions/alert';
import { Log_in } from '../redux/actions/auth';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.secondaryColor.danger,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  centered: {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function Login({ Log_in, active, alert }) {
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });

  const [Errors, SetErrors] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const handleToggle = () => {
    if (active) {
      setOpen(!open);
    } else {
      setOpen(!open);
    }
  };
  let history = useHistory();

  const classes = useStyles();

  React.useEffect(() => {
    if (active) {
      history.push('/');
      setUser({ email: '', password: '' });
    }
    if (alert.length === 1) {
      setOpen(false);
    }
  }, [active, alert.length, history]);

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  console.log(alert.length);
  const handleSubmit = (e) => {
    e.preventDefault();
    Log_in(user);
  };

  if (active === true) {
    return (
      <Container component='main' maxWidth='xs'>
        <div
          className={classes.centered}
          style={{
            width: '100%',
            height: '439px',
          }}
        >
          <CircularProgress color='secondary' />
        </div>
      </Container>
    );
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div
        className={classes.paper}
        style={{
          width: '100%',
          height: '539px',
        }}
      >
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            error={Errors}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            value={user.email}
            onChange={handleChange}
          />
          <TextField
            error={Errors}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            value={user.password}
            autoComplete='current-password'
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            value='Submit'
            onClick={handleToggle}
          >
            {!open ? (
              'Sign In'
            ) : (
              <CircularProgress color='inherit' thickness={2.3} size={30} />
            )}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='/newpassword' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/register' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = (state) => {
  const {
    auth: {
      isAuthenticated,
      user: { active },
    },
    loading,
    alert,
  } = state;
  return {
    isAuthenticated,
    loading,
    active,
    alert,
  };
};
export default connect(mapStateToProps, {
  Log_in,
})(withRouter(Login));
