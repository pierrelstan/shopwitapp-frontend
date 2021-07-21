import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontSize: '22px',
    textTransform: 'upperCase',
    marginRight: '20px',
    border: '2px solid #333',
    padding: '5px',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      marginRight: '0px',
    },
  },
  containerTitle: {
    textDecoration: 'none',
    color: '#333',
  },
  mainContainer: {
    display: 'grid',
    gridTemplateColumns: '150px 1fr',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      textAlign: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      textAlign: 'center',
    },
  },
  subContainer: {
    display: 'grid',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      marginTop: '30px',
      marginBottom: '20px',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '30px',
      marginBottom: '20px',
    },
  },
  containerLinks: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  menuTextSize: {
    fontSize: '16px',
    padding: '14px',
    textTransform: 'uppercase',
  },
}));

function GuestLinks() {
  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <Grid className={classes.subContainer}>
        <Typography variant='h4' className={classes.title}>
          <Link to='/' className={classes.containerTitle} component={Link}>
            SHOPWIT
          </Link>
        </Typography>
      </Grid>
      <Grid className={classes.containerLinks}>
        <Link
          component={RouterLink}
          to='/'
          color='inherit'
          className={classes.menuTextSize}
        >
          Home
        </Link>

        <Link
          component={RouterLink}
          color='inherit'
          to='/men'
          className={classes.menuTextSize}
          type='submit'
        >
          Men
        </Link>

        <Link
          component={RouterLink}
          color='inherit'
          to='/women'
          className={classes.menuTextSize}
          type='submit'
        >
          Woman
        </Link>

        <Link
          component={RouterLink}
          color='inherit'
          to='/sneakers'
          className={classes.menuTextSize}
          type='submit'
        >
          Sneakers
        </Link>

        <Link
          component={RouterLink}
          to='/register'
          color='inherit'
          className={classes.menuTextSize}
        >
          Register
        </Link>

        <Link
          component={RouterLink}
          to='/login'
          color='inherit'
          className={classes.menuTextSize}
        >
          Login
        </Link>
      </Grid>
    </div>
  );
}

export default withRouter(GuestLinks);
