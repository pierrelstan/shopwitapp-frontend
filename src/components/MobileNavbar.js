import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import clsx from 'clsx';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import FolderIcon from '@material-ui/icons/Folder';
import ViewListIcon from '@material-ui/icons/ViewList';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: '#eee',
    // padding: '15px',
  },
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    zIndex: 3,
  },
  hideOnDeskTop: {
    margiRight: '58px',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.up('600px')]: {
      display: 'none',
    },
  },
}));

export default function MobileNavbar() {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  let history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue.toString() === 'home') {
      return history.push('/');
    } else if (newValue.toString() === 'profile') {
      return history.push('/profile');
    } else if (newValue.toString() === 'products') {
      return history.push('/myproducts');
    } else if (newValue.toString() === 'favorites') {
      return;
    } else {
      return;
    }
  };

  const handleClick = () => {
    console.log(value);
  };
  return (
    <div className={classes.hideOnDeskTop}>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        className={clsx(classes.root, classes.stickToBottom)}
        position='fixed'
        onTouchStart={handleClick}
      >
        <BottomNavigationAction label='Home' value='home' icon={<HomeIcon />} />
        <BottomNavigationAction
          label='Carts'
          value='carts'
          icon={<ShoppingCartIcon />}
        />
        <BottomNavigationAction
          label='Products'
          value='products'
          icon={<ViewListIcon />}
        />
        <BottomNavigationAction
          label='Profile'
          value='profile'
          icon={<PersonIcon />}
        />
      </BottomNavigation>
    </div>
  );
}
