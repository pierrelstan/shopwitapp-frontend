import React, { useEffect, useState } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from 'react-hook-form';
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
import { Log_in } from '../redux/actions/auth';


const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(32).required(),
});

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
  const { handleSubmit , control , reset } = useForm({
    resolver: yupResolver(schema),
  });



  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    if (active) {
      setOpen(!open);
    } else {
      setOpen(!open);
    }
  };
  let history = useHistory();

  const classes = useStyles();

  useEffect(() => {
    if (active) {
      history.push('/');
    }
    if (alert.length === 1) {
      setOpen(false);
    }
  }, [active, alert.length, history]);


  const OnSubmit = (data) => {
    Log_in(data);
    reset();
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
    <Container
      component='main'
      maxWidth='xs'
      style={{
        paddingBottom: '39px',
      }}
    >
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
        <form className={classes.form} noValidate onSubmit={handleSubmit(OnSubmit)}>

        <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label="Email"
                  margin='normal'
                  variant='outlined'
                  fullWidth
                  onChange={onChange}
                  autoComplete='email'
                  required
                  autoFocus
                  value={value}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              />
              <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label="Password"
                  margin='normal'
                  variant='outlined'
                  type='password'
                  fullWidth
                  onChange={onChange}
                  autoComplete='email'
                  required
                  autoFocus
                  value={value}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
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
    auth: { isAuthenticated },
    loading,
    alert,
  } = state;
  return {
    isAuthenticated,
    loading,
    active: state.auth.user === null ? false : state.auth.user.active,
    alert,
  };
};
export default connect(mapStateToProps, {
  Log_in,
})(withRouter(Login));
