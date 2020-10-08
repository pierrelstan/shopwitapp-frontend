import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import { Box, BottomNavigation } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeIcon from '@material-ui/icons/Home';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Link from '@material-ui/core/Link';
// import SearchC from './Search';
import { searchItems, clearSearchItems, logout } from '../redux/actions/auth';
// import AlignItemsList from './SubSearch';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  menuButton: {
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(2),
      display: 'none',
    },
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
    // paddingRight: '30px',
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
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.up('600px')]: {
      display: 'none',
    },
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

  containerTitle: {
    textDecoration: 'none',
    color: '#333',
  },
  title: {
    fontSize: '22px',
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: '#333',
    border: '2px solid #333',
    padding: '5px',
    marginRight: '20px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '16px',
      marginRight: '0px',
    },
  },
  hambergeurMargin: {
    marginLeft: '0px',
    textAlign: 'none',

    [theme.breakpoints.down('xs')]: {
      marginLeft: '10px',
      textAlign: 'center',
    },
  },
  menuTextSize: {
    fontSize: '16px',
    // fontWeight: 400,
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
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

function AuthLinks(props) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl01, setAnchorEl01] = React.useState(null);
  const [disp, setDisp] = React.useState(false);
  const [Search, setSearch] = React.useState('');
  const [show, setShow] = React.useState(false);

  let history = useHistory();

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

  const handleClickHamburger = (event) => {
    setAnchorEl01(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl01(null);
  };

  const list = (anchor) => (
    <div
      className={classes.list}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box
        className={classes.containerTitle}
        style={{
          // textAlign: 'center',
          marginTop: '20px',
          marginBottom: '20px',
          marginLeft: '13px',
          // paddingLeft: '30px',
        }}
      >
        <Typography
          variant='h6'
          className={classes.title}
          component={RouterLink}
          to='/'
        >
          SHopwit
        </Typography>
      </Box>
      <Divider />
      <List>
        {['Home', 'Men', 'Women', 'Sell', 'Order', 'Favorites'].map(
          (text, index) => (
            <ListItem button key={text}>
              <Link
                className={classes.linkColor}
                component={RouterLink}
                to={`${
                  text === 'Home'
                    ? '/'
                    : text === 'Sell'
                    ? '/item/new'
                    : '/' + text.toLocaleLowerCase()
                }`}
              >
                {text.toUpperCase()}
              </Link>
            </ListItem>
          ),
        )}
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemText
            primary={'LOGOUT'}
            className={classes.linkColor}
            onClick={() => {
              props.logout();
              history.push('/');
            }}
          />
        </ListItem>
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <Box className={classes.containerTitle}>
        <Typography
          variant='h6'
          className={classes.title}
          component={RouterLink}
          to='/'
        >
          SHopwit
        </Typography>
      </Box>

      <Box className={classes.containerSubMenu}>
        <Button
          component={RouterLink}
          to='/'
          color='inherit'
          className={classes.menuTextSize}
        >
          Home
        </Button>
        <Button
          component={RouterLink}
          color='inherit'
          to='/shop'
          className={classes.menuTextSize}
        >
          shop
        </Button>
        <Button
          component={RouterLink}
          color='inherit'
          to='/item/new'
          className={classes.menuTextSize}
        >
          Sell
        </Button>
        <Button
          component={RouterLink}
          color='inherit'
          to='/men'
          className={classes.menuTextSize}
        >
          Men
        </Button>
        <Button
          component={RouterLink}
          color='inherit'
          to='/woman'
          className={classes.menuTextSize}
        >
          Woman
        </Button>
      </Box>
      <Box className={classes.containerMenu}>
        {/* <SearchC /> */}
        <div
          style={{
            display: `${'block'}`,
            position: 'absolute',
            backgroundColor: '#eee',
            top: '51px',
            right: '136px',
          }}
        >
          {/* <AlignItemsList data={props.search.search} /> */}
        </div>

        <Box className={classes.hideOnDeskTop}>
          <IconButton
            edge='start'
            // className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
            style={{
              margin: '2px',
            }}
          >
            <SearchIcon />
          </IconButton>
        </Box>
        <Box>
          <IconButton>
            <StyledBadge badgeContent='0' color='secondary'>
              <FavoriteBorderIcon />
            </StyledBadge>
          </IconButton>
        </Box>
        <Box>
          <IconButton
            aria-label='cart'
            component={RouterLink}
            to='/carts'
            style={{
              margin: '2px',
            }}
          >
            <StyledBadge
              badgeContent={`${!props.carts ? '0' : props.carts.length}`}
              color='secondary'
            >
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
        </Box>
        <Box className={classes.hambergeurMargin}>
          <div className={classes.hideOnDeskTop}>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='end'
              onClick={toggleDrawer('left', true)}
              // className={clsx(open && classes.hide)}
            >
              <MenuIcon fontSize='small' />
            </IconButton>
            <Drawer
              anchor={'left'}
              open={state['left']}
              onClose={toggleDrawer('left', false)}
            >
              {list('left')}
            </Drawer>
          </div>
        </Box>
        <Box>
          <IconButton
            aria-label='account of current user'
            aria-controls='primary-search-account-menu'
            aria-haspopup='true'
            color='inherit'
            className={classes.hideOnMobile}
            onClick={handleClick}
          >
            <Avatar
              src={props.avatar}
              alt='profile'
              aria-controls='simple-menu'
              color='inherit'
              aria-haspopup='true'
              onMouseOver={handleClick}
            />
          </IconButton>

          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <MenuItem
              onClick={handleClose}
              component={RouterLink}
              to='/profile'
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              component={RouterLink}
              to='/profile'
            >
              My Products
            </MenuItem>
            <MenuItem>Dashboard</MenuItem>
            <MenuItem onClick={(handleClose, () => props.logout())}>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  avatar: state.auth.user.avatar,
  search: state.Search,
});

export default withRouter(
  connect(mapStateToProps, {
    // searchItems, clearSearchItems
    logout,
  })(AuthLinks),
);
