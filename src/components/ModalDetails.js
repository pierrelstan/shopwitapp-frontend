import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import FavoriteSharpIcon from '@material-ui/icons/FavoriteSharp';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Paper, Box, Grid } from '@material-ui/core';
import { fetchItemById, removeItemById } from '../redux/actions/ItemsActions';
import { removeCart, addToCart } from '../redux/actions/carts';
import { addToFavorites, removeFavorites } from '../redux/actions/favorites';
import { fetchRatingById } from '../redux/actions/ratings';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    maxWidth: '300px',
  },
  image: {
    width: '100%',
    maxWidth: '60%',
    height: 'auto',
    objectFit: 'cover',
    [theme.breakpoints.down('xs')]: {
      width: '278px',
      objectFit: 'cover',
      justifySelf: 'center',
    },
  },
  centeredItems: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const ModalDetails = React.memo(({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [showCart, setShowCart] = React.useState(false);
  const [showFav, setShowFav] = React.useState(false);

  const { item, carts, favorites, auth } = useSelector((state) => ({
    item: state.item,
    carts: state.carts.allCarts,
    favorites: state.favorites.allFavorites,
    auth: state.auth.user._id,
  }));

  useEffect(() => {
    dispatch(fetchItemById(id));
    dispatch(fetchRatingById(id));
  }, [dispatch, id]);

  useEffect(() => {
    let Carts = carts && carts.findIndex((item) => item.item._id === id) !== -1;
    if (Carts) {
      setShowCart(true);
    } else {
      setShowCart(false);
    }
  }, [carts, id]);

  useEffect(() => {
    let favs =
      favorites && favorites.findIndex((item) => item.item._id === id) !== -1;

    if (favs) {
      setShowFav(true);
    } else {
      setShowFav(false);
    }
  }, [favorites, id]);

  const handleRemoveFavorite = (id) => {
    let fav = favorites.find((item) => item.item._id === id);
    dispatch(removeFavorites(fav._id));
  };

  const hanldeRemoveCart = (id) => {
    let cart = carts.filter((item) => item.item._id === id);
    const { _id } = cart[0];
    dispatch(removeCart(_id));
  };

  const handleAddCart = (id) => {
    dispatch(addToCart(id));
  };

  const handleAddFavorites = (id) => {
    dispatch(addToFavorites(id));
  };

  const handleDeleteItem = (id, auth) => {
    dispatch(removeItemById(id, auth))
      .then(() => {
        history.push('/myproducts');
      })
      .catch((e) => {
        console.log(e);
      });
    history.push('/myproducts');
  };

  if (item.error) {
    return <div>Error: {item.error.message}: : Please connect to Internet</div>;
  } else {
    return (
      <div
        style={{
          margin: '50px',
        }}
      >
        <div className={classes.root}>
          <Box>
            {!item.isLoaded ? (
              <div className={classes.center}>
                <CircularProgress color="secondary" />
              </div>
            ) : (
              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={6}>
                  <img
                    className={classes.image}
                    src={item.item.imageUrl}
                    alt={item.item.title}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <div>
                    <h1
                      style={{
                        fontSize: '16px',
                      }}
                    >
                      {item.item.title}
                    </h1>
                  </div>
                  <div>
                    <p
                      style={{
                        color: '#878787',
                        fontSize: '22px',
                        lineHeight: '22px',
                      }}
                    >
                      ${item.item.price}.00
                    </p>
                  </div>
                  <div
                    style={{
                      marginBottom: '20px',
                      padding: 0,
                      border: 0,
                    }}
                  >
                    <Link
                      component={RouterLink}
                      to={`/item/${item.item._id}`}
                      className={classes.textLink}
                    >
                      <p>{item.item.description}</p>
                    </Link>
                  </div>
                  <Box
                    style={{
                      marginBottom: '20px',
                    }}
                  ></Box>
                  <div
                    style={{
                      display: 'inline-flex',
                      gap: '48px',
                      flexWrap: 'wrap',
                      paddingTop: '40px',
                    }}
                  >
                    {showCart && (
                      <AddShoppingCartIcon
                        style={{
                          cursor: 'pointer',
                          color: '#4BB543',
                        }}
                        onClick={() => hanldeRemoveCart(item.item._id)}
                      />
                    )}
                    {!showCart && (
                      <ShoppingCartOutlinedIcon
                        style={{
                          cursor: 'pointer',
                        }}
                        onClick={() => handleAddCart(item.item._id)}
                      />
                    )}

                    {showFav && (
                      <FavoriteSharpIcon
                        style={{
                          cursor: 'pointer',
                          color: '#cb436b',
                        }}
                        onClick={() => handleRemoveFavorite(item.item._id)}
                      />
                    )}
                    {!showFav && (
                      <FavoriteBorderIcon
                        style={{
                          cursor: 'pointer',
                        }}
                        onClick={() => handleAddFavorites(item.item._id)}
                      />
                    )}

                    {auth === item.item.userId && (
                      <Link
                        component={RouterLink}
                        to={`/item/update/${item.item._id}`}
                      >
                        <EditIcon />
                      </Link>
                    )}

                    {auth === item.item.userId && (
                      <DeleteOutlineIcon
                        style={{
                          cursor: 'pointer',
                        }}
                        onClick={() => handleDeleteItem(item.item._id, auth)}
                      />
                    )}
                  </div>
                </Grid>
              </Grid>
            )}
          </Box>
        </div>
      </div>
    );
  }
});

export default ModalDetails;
