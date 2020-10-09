import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import { Link, withRouter } from 'react-router-dom';
import { Link, withRouter } from 'react-router-dom';
// import Link from '@material-ui/core/Link';

import Box from '@material-ui/core/Box';
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
  moveToRight: {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
}));

function GuestLinks() {
  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <Grid className={classes.subContainer}>
        <Typography variant='h4' className={classes.title}>
          <Link to='/' className={classes.containerTitle}>
            SHOPWIT
          </Link>
        </Typography>
      </Grid>
      <Grid className={classes.moveToRight}>
        <Box>
          <Button component={Link} to={'/'} color='inherit'>
            Home
          </Button>
        </Box>
        <Box>
          <Button component={Link} to={'/register'} color='inherit'>
            Register
          </Button>
        </Box>
        <Box>
          <Button component={Link} to={'/login'} color='inherit'>
            Login
          </Button>
        </Box>
      </Grid>
    </div>
  );
}

export default withRouter(GuestLinks);
