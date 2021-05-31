import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link as RouterLink, useHistory, useParams } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Paper, Box, ButtonGroup } from '@material-ui/core';
import { fetchItemById, removeItemById } from '../redux/actions/ItemsActions';
import { removeCart, addToCart } from '../redux/actions/carts';
import { addToFavorites, removeFavorites } from '../redux/actions/favorites';
import Wrapper from '../components/Wrapper';
import ScrollOnTop from '../components/ScrollOnTop';
import Titles from '../components/Titles';
import { Rating } from '@material-ui/lab';
// import ScrollToTop from './ScrollOnTop';
import { BACKEND_URL } from '../config';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  image: {
    width: '100%',
    maxWidth: '300px',
    height: 'auto',
    objectFit: 'cover',
    [theme.breakpoints.down('xs')]: {
      width: '278px',
      objectFit: 'cover',
      justifySelf: 'center',
    },
  },
  containerItem: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '50px',
    justifyContent: 'center',
    marginTop: '50px',
  },
  p: {
    fontSize: '18px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '15px',
    },
  },
  centered: {
    position: 'fixed',
    top: '50%',
    left: '50%',
  },
}));

const Item = () => {
  const classes = useStyles();
  const [showCart, setShowCart] = React.useState(false);
  const [showFav, setShowFav] = React.useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();

  const { carts, favorites, item } = useSelector((state) => ({
    carts: state.carts.allCarts,
    item: state.item,
    favorites: state.favorites.allFavorites,
    loading: state.lastProducts.isLoadingLast10Products,
  }));
  let history = useHistory();
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

  const handleDeleteItem = (id) => {
    dispatch(removeItemById(id));
    history.push('/myproducts');
  };

  if (!item.isLoaded) {
    return (
      <Wrapper>
        <Titles>Product</Titles>
        <CircularProgress color='secondary' />
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
        <Container maxWidth='lg'>
          <Titles>Product</Titles>
          <div>
            <Paper elevation={0}>
              <div className={classes.container}>
                <img
                  className={classes.image}
                  src={`${BACKEND_URL}/${item.item.imageUrl}`}
                  alt={item.item.title}
                />
                <div>
                  <span>
                    {' '}
                    <h1>Title</h1>
                    <p>{item.item.title}</p>
                  </span>

                  <h2>Details</h2>
                  <p>{item.item.description}</p>

                  <p> Quantity: {item.item.quantityProducts}</p>
                  <p>$ {item.item.price}</p>
                  <Box
                    style={{
                      marginBottom: '20px',
                    }}
                  >
                    <h2>Ratings</h2>
                    <Rating
                      name='customized-empty'
                      defaultValue={2}
                      precision={0.5}
                      emptyIcon={<StarBorderIcon fontSize='inherit' />}
                    />
                  </Box>

                  <ButtonGroup
                    size='small'
                    aria-label='small outlined button group'
                  >
                    {showCart && (
                      <Button onClick={() => hanldeRemoveCart(item.item._id)}>
                        Remove Cart
                      </Button>
                    )}
                    {!showCart && (
                      <Button onClick={() => handleAddCart(item.item._id)}>
                        Add to Cart
                      </Button>
                    )}

                    {showFav && (
                      <Button
                        onClick={() => handleRemoveFavorite(item.item._id)}
                      >
                        Remove Favorite
                      </Button>
                    )}
                    {!showFav && (
                      <Button onClick={() => handleAddFavorites(item.item._id)}>
                        Add to Favorite
                      </Button>
                    )}
                  </ButtonGroup>
                  <ButtonGroup
                    size='small'
                    aria-label='small outlined button group'
                  >
                    <Button>
                      <Link
                        component={RouterLink}
                        to={`/item/update/${item.item._id}`}
                      >
                        Edit{' '}
                      </Link>
                    </Button>
                    <Button onClick={() => handleDeleteItem(item.item._id)}>
                      Delete
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </Paper>
          </div>
          <div>
            {/* <Typography variant='h4'>Feedback</Typography> */}
            {/* <Typography variant='h6' className={classes.p}>
              Feel free to leave any feedback about the changes by commenting on
              this post
            </Typography> */}
          </div>
          {/* <CommmentsItem /> */}
        </Container>
        {/* <ContainerFooter /> */}
      </div>
    );
  }
};

export default Item;
