import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({
  containerApp: {
    color: '#A67A4B',
    backgroundColor: '#fff',
  },
  toolbar: {
    paddingLeft: '30px',
    paddingRight: '30px',
    [theme.breakpoints.down('600')]: {
      paddingLeft: '14px',
      paddingRight: '14px',
    },
  },
}));

function Navbar(props) {
  const classes = useStyles();

  return (
    <AppBar position='static' className={classes.containerApp} elevation={0}>
      <Toolbar className={classes.toolbar}>{props.children}</Toolbar>
    </AppBar>
  );
}

export default Navbar;
