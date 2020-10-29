import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { fetchItems } from '../redux/actions/ItemsActions';
// import { addToCart } from '../actions/ItemsActions';
// import { allCarts } from '../actions/ItemsActions';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { Box, Button } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useDispatch } from 'react-redux';
// import { Rating } from '@material-ui/lab';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CircularProgress from '@material-ui/core/CircularProgress';
import Wrapper from './Wrapper';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Titles from './Titles';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    // paddingTop: '56.25%',
  },
  containerItems: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '42px',
  },
  textLink: {
    textDecoration: 'none',
    color: '#333',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  imageCard: {
    objectFit: 'cover',
    '&:hover': {
      boxShadow: 'none',
    },
    [theme.breakpoints.between('sm', 'lg')]: {
      objectFit: 'cover',
    },
    [theme.breakpoints.only('xs')]: {
      objectFit: 'contain',
      width: '145px',
      position: 'relative',
      top: '-69px',
      left: '58px',
    },
    [theme.breakpoints.up('sm')]: {
      objectFit: 'cover',
    },
  },
  card: {
    width: '347px',
    height: '337px',
    // position: 'relative',
    borderRadius: '24px',
    transition: '0.5s ease-in-out ',
    boxShadow: '0px 7px 10px rgba(0,0,0,0.5)',
    '&:hover': {
      position: 'inherit',
      boxShadow:
        'linear-gradient(to bottom, rgba(0,176,155,0.5), rgba(150,201,61,1))',
      transform: 'translateY(20px)',
    },
    '&:hover:before': {
      opacity: 1,
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'block',
      width: '100%',
      height: '100%',
      zIndex: 2,
      transition: '0.5s all',
      opacity: 0,
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.5),rgba(0,0,0,0.5))',
    },

    '& p': {
      position: 'absolute',
      top: '100px',
      zIndex: 3,
      color: '#fff',
      opacity: 0,
      transform: 'translateY(30px)',
      transition: '0.5s all',
    },
    '&:hover p': {
      opacity: 1,
      transform: 'translateY(0px)',
    },
    '& button': {
      position: 'relative',
      top: `${-437}px`,
      zIndex: 4,
      color: '#fff',
      opacity: 0,
      transform: 'translateY(30px)',
      transition: '0.5s all',
    },

    '&:hover button': {
      opacity: 1,
      transform: 'translateY(0px)',
    },
    [theme.breakpoints.down('xs')]: {
      height: '240px',
    },
  },
  button: {
    backgroundColor: '#333',
    objectFit: 'filled',
    // left: '200px',
    margin: '20px',
    // top: '-21px',
    padding: '10px 20px',
    borderRadius: '5px',
    // backgroundColor: '#eee',
    transition: '1s cubic-bezier(0.2, 0.8, 0.2, 1)',
    color: '#AD855A',
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: '#eee',
      color: '#333',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
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
    padding: '15px',
    fontSize: '18px',
    zIndex: 2,
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
}));
function PopularProducts(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(2);
  const [likeCarts, setLikeCarts] = React.useState({});
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  const onClickedLike = useCallback(
    () => dispatch({ type: 'TOGGLE_FAVORITE', value: props.items.items }),
    [dispatch],
  );
  React.useEffect(() => {
    props.fetchItems();
  }, []);

  const displayFavoriteItems = (id) => {
    if (props.items.items.findIndex((item) => item._id === id) !== -1) {
      return (
        <FavoriteBorderIcon
          style={{
            fontSize: '32px',
            color: 'black',
            margin: '10px',
          }}
        />
      );
    }

    return (
      <FavoriteIcon
        style={{
          fontSize: '32px',
          color: 'black',
          margin: '10px',
        }}
      />
    );
  };
  if (!props.items.isLoaded) {
    return (
      <Wrapper>
        <Titles title='LAST PRODUCTS' />
        <div className={classes.centered}>
          <CircularProgress color='secondary' />
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <Titles title='LAST PRODUCTS' />
      <div className={classes.main}>
        <div className={classes.containerItems}>
          {props.items.items.map((data) => (
            <Card
              className={classes.card}
              key={data.title}
              elevation={matches ? 1 : 0}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  padding: '20px',
                }}
              >
                <Typography component='span' className={classes.price}>
                  ${data.price}
                </Typography>
              </div>
              <Link
                component={RouterLink}
                to={`/item/${data._id}`}
                className={classes.textLink}
              >
                <img
                  alt={data.title}
                  // height='50'
                  src={data.imageUrl}
                  title={data.title}
                  className={classes.imageCard}
                  style={{
                    width: '347px',
                    position: 'relative',
                    top: '-175px',
                  }}
                />
                <CardContent>
                  <p>{data.description}</p>
                </CardContent>
              </Link>
              <div
                style={{
                  display: 'flex',
                  // gridTemplateColumns: '1fr 1fr',
                  justifyContent: 'space-around',
                }}
              >
                <div>
                  <Box>
                    <Link
                      component={RouterLink}
                      to={`/item/${data._id}`}
                      className={classes.textLink}
                    >
                      <Button className={classes.button}>
                        <FavoriteBorderIcon />
                      </Button>
                    </Link>
                  </Box>
                </div>
                <div>
                  <Box>
                    <Link
                      component={RouterLink}
                      to={`/item/${data._id}`}
                      className={classes.textLink}
                    >
                      <Button className={classes.button}>
                        <AddShoppingCartIcon />
                      </Button>
                    </Link>
                  </Box>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div
          style={{
            marginTop: '100px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            size='large'
            variant='outlined'
            color='primary'
            style={{
              padding: '4px 10px',
            }}
          >
            More
          </Button>
        </div>
      </div>
    </Wrapper>
  );
}

const mapStateToProps = (state) => ({
  items: state.items,
});

export default withRouter(
  connect(mapStateToProps, {
    fetchItems,
    // addToCart, allCarts
  })(PopularProducts),
);
