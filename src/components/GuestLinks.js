import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { Grid } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Box } from '@material-ui/core';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { openCart } from '../redux/actions/openCart';
import { openFavoritesAndClosing } from '../redux/actions/OpenAndCloseFavorites';

const minWidth = 140;

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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '20px',
    border: '2px solid #333',
    padding: '6px',
    textAlign: 'center',
    textDecoration: 'none',
    color: '#333',
    width: '96px',
    height: '20px',
    [theme.breakpoints.down('sm')]: {
      marginRight: '0px',
    },
  },
  title2: {
    fontSize: '22px',
    textTransform: 'upperCase',
    marginRight: '20px',
    border: '2px solid #333',
    padding: '5px',
    textAlign: 'center',
    textDecoration: 'none',
    color: '#333',
    [theme.breakpoints.down('sm')]: {
      marginRight: '0px',
    },
  },

  containerTitle: {
    textDecoration: 'none',
    color: '#333',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  mainContainer: {
    display: 'flex',
    justifyContent: 'space-between',
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
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
      display: 'none',
    },
  },
  menuTextSize: {
    fontSize: '16px',
    padding: '14px',
    textTransform: 'uppercase',
  },
  containerSubMenu: {
    display: 'none',
    // margin: theme.spacing(2),
    justifyContent: 'center',

    [theme.breakpoints.up('md')]: {
      flexGrow: 1,
      justifyContent: 'center',
      display: 'flex',
    },
  },
  containerMenu: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    alignItems: 'center',
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center',
    },
  },
  containerLogo: {
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      flexGrow: 0,
    },
  },
  logo: {
    fontSize: '12px',
    textTransform: 'upperCase',
    border: '1px solid #333',
    padding: '2px 10px',
    textDecoration: 'none',
    color: '#333',

    [theme.breakpoints.up('md')]: {
      flexGrow: 0,
      fontSize: '22px',
      textTransform: 'upperCase',
      border: '1px solid #333',
      padding: '5px 20px',
      textDecoration: 'none',
      color: '#333',
    },
  },
  hideOnMobile: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  hideOnDeskTop: {
    margiRight: '58px',
    // display: 'flex',
    // justifyContent: 'flex-end',
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    // [theme.breakpoints.up('600px')]: {
    //   display: 'none',
    // },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  avatar: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(3),
    },
    justifyContent: 'center',
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  lineSpacing: {
    fontWeight: 'bold',
    lineHeight: '1.2',
    marginBottom: '2px',
    color: '#575353',
  },
  // mobile
  moveToRigth: {
    flexGrow: '1',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  linkColor: {
    color: '#a67a4b',
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  hover: {
    '&:hover': {
      display: 'block',
    },
  },
  paper: {
    minWidth: minWidth,
    borderRadius: 4,
    marginTop: 20,
  },
  position: {
    display: 'none',
  },
  link: {
    color: '#333',
    '&:hover': {
      color: '#333',
      textDecoration: 'none',
    },
  },
}));

function GuestLinks() {
  const classes = useStyles();
  let history = useHistory();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickCart = () => {
    openCart(true);
  };

  const handleClickFav = () => {
    openFavoritesAndClosing(true);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box
        className={classes.containerTitle}
        style={{
          marginTop: '20px',
          marginBottom: '20px',
          marginLeft: '13px',
        }}
      >
        <Typography
          variant="h6"
          className={classes.title2}
          component={RouterLink}
          to="/"
        >
          SHopwit
        </Typography>
      </Box>
      <Divider />
      <List>
        {['Home', 'Men', 'Women', 'sneakers'].map((text, index) => (
          <ListItem
            button
            key={text}
            component={RouterLink}
            to={`${text === 'Home' ? '/' : '/' + text.toLocaleLowerCase()}`}
          >
            <Link className={classes.linkColor}>{text.toUpperCase()}</Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemText
            primary={'LOGIN'}
            className={classes.linkColor}
            onClick={() => {
              history.push('/login');
            }}
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary={'SIGNUP'}
            className={classes.linkColor}
            onClick={() => {
              history.push('/register');
            }}
          />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.mainContainer}>
      <Grid className={classes.subContainer}>
        <Typography
          variant="h6"
          className={classes.title}
          component={RouterLink}
          to="/"
          type="submit"
        >
          SHOPWIT
        </Typography>

        <Box>
          <div className={classes.hideOnDeskTop}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={toggleDrawer('left', true)}
              // className={clsx(open && classes.hide)}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
            <Drawer
              anchor={'left'}
              open={state['left']}
              onClose={toggleDrawer('left', false)}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {list('left')}
            </Drawer>
          </div>
        </Box>
      </Grid>

      <Grid className={classes.containerLinks}>
        <Link
          component={RouterLink}
          to="/"
          color="inherit"
          className={classes.menuTextSize}
        >
          Home
        </Link>

        <Link
          component={RouterLink}
          color="inherit"
          to="/men"
          className={classes.menuTextSize}
          type="submit"
        >
          Men
        </Link>

        <Link
          component={RouterLink}
          color="inherit"
          to="/women"
          className={classes.menuTextSize}
          type="submit"
        >
          Woman
        </Link>

        <Link
          component={RouterLink}
          color="inherit"
          to="/sneakers"
          className={classes.menuTextSize}
          type="submit"
        >
          Sneakers
        </Link>

        <Link
          component={RouterLink}
          to="/register"
          color="inherit"
          className={classes.menuTextSize}
        >
          Register
        </Link>

        <Link
          component={RouterLink}
          to="/login"
          color="inherit"
          className={classes.menuTextSize}
        >
          Login
        </Link>
      </Grid>
    </div>
  );
}

export default withRouter(GuestLinks);
