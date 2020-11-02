import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Paper, Box, ButtonGroup } from '@material-ui/core';
// import { Rating } from '@material-ui/lab';
// import CommmentsItem from './commentsItem';
import {
  fetchItemById,
  // removeItemById,
  // removeCart,
  // allCarts,
  // addToCart,
} from '../redux/actions/ItemsActions';
import Wrapper from '../components/Wrapper';
import ScrollOnTop from '../components/ScrollOnTop';
// import ScrollToTop from './ScrollOnTop';

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

const Item = (props) => {
  let {
    item,
    removeItemById,
    fetchItemById,
    history,
    carts,
    addToCart,
    match: {
      params: { id },
    },
  } = props;

  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    console.log(id);
    if (id) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [id]);

  React.useEffect(() => {
    setTimeout(() => {
      fetchItemById(id);
    }, 10);
  }, [id]);

  const handleClickAddToCart = async (id) => {
    await addToCart(id);
  };

  const handleDeleteItem = async () => {
    await removeItemById(id);
    await props.history.push('/');

    let store = localStorage.getItem('store');

    carts.map((cart) => {
      if (cart._id === id) {
        // removeCart(cart.item._id);
        // allCarts(userId);
        // history.push('/carts');
      }
    });
  };

  const data = props.item.item;
  if (!item.isLoaded) {
    return (
      <div className={classes.centered}>
        <CircularProgress color='secondary' />
      </div>
    );
  }
  if (item.error) {
    return <div>Error: {item.error.message}: : Please connect to Internet</div>;
  } else {
    return (
      <div>
        <ScrollOnTop />
        <Wrapper>
          <div>
            <Paper elevation={0}>
              <div className={classes.container}>
                <img
                  className={classes.image}
                  src={data.imageUrl}
                  alt={data.title}
                />
                <div>
                  <h1>{data.title}</h1>
                  <h2>Details</h2>
                  <p>{data.description}</p>

                  <p> Quantity: {data.quantityProducts}</p>
                  <p>$ {data.price}</p>
                  <Box
                    style={{
                      marginBottom: '20px',
                    }}
                  >
                    <h2>Ratings</h2>
                    {/* <Rating
                      name='customized-empty'
                      defaultValue={2}
                      precision={0.5}
                      emptyIcon={<StarBorderIcon fontSize='inherit' />}
                    /> */}
                  </Box>

                  <ButtonGroup
                    size='small'
                    aria-label='small outlined button group'
                  >
                    <Button onClick={() => handleClickAddToCart(data._id)}>
                      Add to Cart
                    </Button>
                    <Button>Add to Favorites</Button>
                  </ButtonGroup>
                  <ButtonGroup
                    size='small'
                    aria-label='small outlined button group'
                  >
                    <Button>
                      <Link
                        component={RouterLink}
                        to={`/item/update/${data._id}`}
                      >
                        Edit{' '}
                      </Link>
                    </Button>
                    <Button onClick={handleDeleteItem}>Delete</Button>
                  </ButtonGroup>
                </div>
              </div>
            </Paper>
          </div>
          <div>
            <Typography variant='h4'>Feedback</Typography>
            <Typography variant='p' className={classes.p}>
              Feel free to leave any feedback about the changes by commenting on
              this post, reaching out via the support email, or on talk to me on
              twitter @tradenba1.
            </Typography>
          </div>
          {/* <CommmentsItem /> */}
        </Wrapper>
        {/* <ContainerFooter /> */}
      </div>
    );
  }
};
const mapStateToProps = (state) => ({
  item: state.item,
  // carts: state.RootCarts.allCarts,
});
export default connect(mapStateToProps, {
  fetchItemById,
  // removeItemById,
  // removeCart,
  // allCarts,
  // addToCart,
})(Item);
