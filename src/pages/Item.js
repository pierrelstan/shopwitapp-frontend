import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';
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
import { addRatings, fetchRatingById } from '../redux/actions/ratings';
import Wrapper from '../components/Wrapper';
import ScrollOnTop from '../components/ScrollOnTop';
import Titles from '../components/Titles';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
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
  centereItems: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addColorFav: {
    cursor: 'pointer',
    color: '#cb436b',
  },
  removeColorFav: {
    cursor: 'pointer',
  },
  addColorCart: {
    cursor: 'pointer',
    color: '#4BB543',
  },
  removeColorCart: {
    cursor: 'pointer',
  }
}));

const Item = () => {
  const classes = useStyles();
  const [showCart, setShowCart] = useState(false);
  const [showFav, setShowFav] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();

  const { carts, item, favorites, ratings, auth } = useSelector((state) => ({
    carts: state.carts.allCarts,
    item: state.item,
    favorites: state.favorites.allFavorites,
    loading: state.lastProducts.isLoadingLast10Products,
    ratings: state.ratings,
    auth: state.auth.user._id,
  }));

  let navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchItemById(id));
  }, [dispatch, id]);

  React.useEffect(() => {
    let Carts = carts && carts.findIndex((item) => item.item._id === id) !== -1;
    if (Carts) {
      setShowCart(true);
    } else {
      setShowCart(false);
    }
  }, [carts, id]);

  React.useEffect(() => {
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
    dispatch(removeItemById(id, auth)).then(()=> {
       navigate.push('/myproducts');
    }).catch((e)=> {
      console.log(e);
    })
  };

  const handleChangeRating = (newValue) => {
    dispatch(addRatings(id, newValue));
    dispatch(fetchRatingById(id));
  };

  if (!item.isLoaded) {
    return (
      <Wrapper>
        <Titles>Product</Titles>
        <CircularProgress color="secondary" />
      </Wrapper>
    );
  }
  if (item.error) {
    return <div>Error: {item.error.message}: : Please connect to Internet</div>;
  } else {
    return (
      <div
        style={{
          marginBottom: '50px',
        }}
      >
        <ScrollOnTop />
        <Container maxWidth="md">
          <Titles>Product</Titles>
          <div>
            <Paper elevation={0}>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6} className={classes.centereItems}>
                  <img
                    className={classes.image}
                    src={item.item.imageUrl}
                    alt={item.item.title}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.centereItems}>
                  <div>
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
                      <p>{item.item.description}</p>
                    </div>
                    <Box
                      style={{
                        marginBottom: '20px',
                      }}
                    >
                      <Rating
                        name="customized-empty"
                        value={ratings.rating}
                        precision={0.5}
                        max={5}
                        min={0}
                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                        onChange={(event, newValue) => {
                          handleChangeRating(newValue);
                        }}
                      />
                    </Box>

                    <div
                      style={{
                        display: 'inline-flex',
                        gap: '87px',
                        flexWrap: 'wrap',
                        paddingTop: '40px',
                      }}
                    >
                      {showCart && (
                        <AddShoppingCartIcon
                          className={classes.addColorCart}
                          onClick={() => hanldeRemoveCart(item.item._id)}
                        />
                      )}
                      {!showCart && (
                        <ShoppingCartOutlinedIcon
                        className={classes.removeColorCart}
                          onClick={() => handleAddCart(item.item._id)}
                        />
                      )}

                      {showFav && (
                        <FavoriteSharpIcon
                          className={classes.addColorFav}
                          onClick={() => handleRemoveFavorite(item.item._id)}
                        />
                      )}
                      {!showFav && (
                        <FavoriteBorderIcon
                        className={classes.removeColorFav}
                          onClick={() => handleAddFavorites(item.item._id)}
                        />
                      )}
                      {
                        auth === item.item.userId && (
                       <Link
                        component={RouterLink}
                        to={`/item/update/${item.item._id}`}
                      >
                        <EditIcon />
                      </Link>
                        )
                      }

                      {auth === item.item.userId && (
                        <DeleteOutlineIcon
                          style={{
                            cursor: 'pointer',
                          }}
                          onClick={() => handleDeleteItem(item.item._id, auth)}
                        />
                      )}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </div>
        </Container>
      </div>
    );
  }
};

export default Item;
