import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { removeFavorites , allFavorites } from '../redux/actions/favorites';
import Titles from '../components/Titles';
import MenuNavigation from '../components/MenuNavigation';
import ModalItemDetails from "../components/ModalItemDetails"

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
  },
  container: {
    width: 'auto',
    margin: 0,
    [theme.breakpoints.between('1200', '1440')]: {
      width: '1440px',
      margin: '0 auto',
    },
  },
  containerItems: {
    display: 'grid',
    minHeight: '400px',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    justifyItems: 'center',
    gap: '20px',
    margin: '10px',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '10px',
    },

    [theme.breakpoints.down('665')]: {
      justifyContent: 'center',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
      gridTemplateColumns: '1fr',
      gap: '62px',
    },
  },
  imageCard: {
    maxWidth: '100%',
    objectFit: 'cover',
    margin: 0,
    padding: 0,
    width: '320px',
    height: '175px',

    [theme.breakpoints.between('sm', 'lg')]: {
      objectFit: 'cover',
    },
    [theme.breakpoints.down('xs')]: {
      objectFit: 'cover',
      width: '100%',
    },

    [theme.breakpoints.down('sm')]: {
      objectFit: 'contain',
    },
  },
  card: {
    width: '200px',
    height: '250px',
    borderRadius: '24px',
    transition: '0.5s ease-in-out ',
    padding: '10px',
    boxShadow:
      ' 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2)',
    '&:hover': {
      position: 'inherit',
      boxShadow:
        'linear-gradient(to bottom, rgba(0,176,155,1.8), rgba(150,201,61,2))',
      transform: 'translateY(20px)',
    },

    '& p': {
      position: 'absolute',
      top: '100px',
      zIndex: 2,
      color: '#fff',
      opacity: 0,
      transform: 'translateY(30px)',
      transition: '0.5s all',
      fontSize: '18px',
      wordWrap: 'break-all',
      display: 'none',
      padding: '4px',
      textAlign: 'center',
      backgroundColor: '#555',
    },

    '& h1': {
      textTransform: 'uppercase',
      position: 'absolute',
      top: '20px',
      zIndex: 3,
      color: '#fff',
      opacity: 0,
      transform: 'translateY(-30px)',
      transition: '0.5s all',
    },
    '& $button': {
      zIndex: 4,
      color: '#fff',
      opacity: 0,
      transform: 'translateY(30px)',
      transition: '0.5s all',
    },

    '&:hover $button': {
      opacity: 1,
      transform: 'translateY(0px)',
    },
    '&:hover $price': {
      background: '#fff',
      color: '#d13c6f',
      textDecoration: 'none'
    },
  },
  button: {
    color: '#fff !important',
    objectFit: 'filled',
    margin: '20px',
    padding: '10px 20px',
    borderRadius: '5px',
    transition: '1s cubic-bezier(0.2, 0.8, 0.2, 1)',
  },
  removeHover: {
    backgroundColor: 'none',
    '&:focus': {
      boxShadow: 'none',
      backgroundColor: 'none',
    },
  },
  price: {
    color: '#ffffff',
    borderRadius: '50%',
    backgroundColor: '#d13c6f',
    width: '50px',
    height: '50px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '18px',
    zIndex: 2,
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',

  },
  centered: {
    display: 'flex',
    justifyContent: 'center',
  },
  containerButton: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    top: '227px',
    width: '94%',
  },
  TextLink: {
    textDecoration: 'none! important',
    cursor:'pointer',
  },
  ContainerPrice: {
    display: 'flex',
    justifyContent: 'flex-end',
    position:'relative',
    right:'auto',
    zIndex: 3,
  }
}));



function Favorites() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [idItem, setIdItem]= useState('');

  const { item, favorites} = useSelector((state) => ({
    favorites: state.favorites.allFavorites,
    loading: state.lastProducts.isLoadingLast10Products,
    item: state.item,
  }));



  useEffect(() => {
    dispatch(allFavorites);
}, [dispatch ,item]);

  const handleClickOpen = (id) => {
    setOpen(true);
    if(id){
  setIdItem(id);
}
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteCart = (id) => {
    dispatch(removeFavorites(id));
  };

  return (
    <Container maxWidth='lg'>
      <Titles>my Favorites</Titles>
      <Grid className={classes.containerItems}>
        {favorites.map((cart) => (
          <Paper className={classes.card} key={cart.item.title} elevation={1}>
            {
              cart.item === null ? (
              <div>
                <h4> This item has been removed by the owner</h4>

                <button onClick={() => handleDeleteCart(cart._id)}>
                  Delete
                </button>
              </div>
            ) :
             (
              <div>
                <Box
                  onClick={()=>handleClickOpen(cart.item._id)}
                  className={classes.TextLink}
                >
                <div className={classes.ContainerPrice}>
                  <Typography component='span' className={classes.price}>
                    ${cart.item.price}
                  </Typography>
                </div>

                <img
                  alt={cart.item.title}
                  src={cart.item.imageUrl}
                  title={cart.item.title}
                  className={classes.imageCard}
                />
              </Box>
              </div>
            )
            }
          </Paper>
        ))}
      <ModalItemDetails
      open={open}
      handleClose={handleClose}
      id={idItem}
      />
      </Grid>
      <MenuNavigation/>
    </Container>
  );
}

export default Favorites;
