import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import {Link} from 'react-router-dom';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from '@material-ui/core/Link';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import { fetchItems } from '../redux/actions/ItemsActions';
import { addToCart } from '../redux//actions/ItemsActions';
// import AdsJumbotron from '../components/jumbotron';
import MenuNavigation from './MenuNavigation';
import { allCarts } from '../redux//actions/ItemsActions';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Box, Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import { useDispatch } from 'react-redux';
// import { Rating } from '@material-ui/lab';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { matches } from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';
import Wrapper from './Wrapper';
import Titles from './Titles';

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const useStyles = makeStyles((theme) => ({
  list: {},
  media: {
    height: 0,
    // paddingTop: '56.25%', // 16:9
  },
  containerItems: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    objectFit: 'cover',
  },
  textLink: {
    textDecoration: 'none',
    color: '#333',
  },
  imageCard: {
    objectFit: 'cover',
    // height: 'auto',
    width: '256px',
    height: '253px',
    // backgroundSize: 'cover',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.between('600', '760')]: {
      width: '210px',
    },
  },
  main: {
    marginTop: '50px',
  },
  card: {
    // width: '100%',
    // height: 'auto',
    // minWidth: '300px',
    maxWidth: '400px',
    borderRadius: '24px',
  },

  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    // width: '100%',
    // height: 'auto',

    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    // overflowY: 'auto',
    overflow: 'auto',
    margin: 0,
    padding: 0,
    listStyle: 'none',

    height: '100%',
    '::-webkit-scrollbar-button ': {
      width: '50px',
      backgroundColor: 'red',
    },
    '&::-webkit-scrollbar': {
      // display: 'none',
      width: '0.1em',
    },
    /* Up */
    '&::-webkit-scrollbar-button:single-button:vertical:decrement': {
      borderWidth: '0 8px 8px 8px',
      borderColor: 'transparent transparent #555555 transparent',
    },

    '&::-webkit-scrollbar-button:single-button:vertical:decrement:hover': {
      borderWolor: 'transparent transparent #777777 transparent',
    },
    /* Down */
    '&::-webkit-scrollbar-button:single-button:vertical:increment': {
      borderWidth: '8px 8px 0 8px',
      borderColor: '#555555 transparent transparent transparent',
    },
    '&::-webkit-scrollbar-track': {
      // display: 'none',
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      // display: 'none',
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey',
    },
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  itemsWidth: {
    width: ' 27.3333% !important',
  },
  titleColor: {
    color: '#808080',
  },
  borderRadius: {
    borderRadius: '24px !important',
  },
  centered: {
    textAlign: 'center',
  },
  price: {
    color: '#ffffff',
    borderRadius: '50%',
    backgroundColor: '#d13c6f',
    padding: '15px',
    fontSize: '18px',
    width: '30px',
    zIndex: 2,
    objectFit: 'filled',
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    [theme.breakpoints.down('sm')]: {
      left: '168px',
    },
  },
  container_image: {
    textAlign: 'center',
  },
  rating: {
    paddingLeft: '30px',
  },
}));
function MostRated(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState(2);
  const [state, setState] = React.useState(false);
  const [likeCarts, setLikeCarts] = React.useState({});
  const dispatch = useDispatch();
  const theme = useTheme();

  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = !props.items.items.length ? 0 : props.items.items.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const onClickedLike = useCallback(
    () => dispatch({ type: 'TOGGLE_FAVORITE', value: props.items.items }),
    [dispatch],
  );

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
      <Titles title='MOST RATED' />
      <div className={classes.main}>
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          navigation
          // pagination={{ clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {props.items.items.map((data) => (
            <SwiperSlide key={data._id}>
              <div
                style={{
                  width: '347px',
                  height: '337px',
                  borderRadius: '24px',
                  marginTop: '40px',
                  marginLeft: '40px',
                  marginRight: '40px',
                  marginBottom: '40px',
                  boxShadow:
                    ' 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: '20px',
                  }}
                >
                  <Typography className={classes.price}>
                    ${data.price}
                  </Typography>
                </div>

                <div className={classes.container_image}>
                  <Link
                    href={`/item/${data._id}`}
                    key={data._id}
                    className={classes.textLink}
                  >
                    <img
                      src={data.imageUrl}
                      alt={data.title}
                      className={classes.imageCard}
                    />
                  </Link>
                </div>
                {/* <Rating
                className={classes.rating}
                name='customized-empty'
                defaultValue={2}
                precision={0.5}
                emptyIcon={<StarBorderIcon fontSize='inherit' />}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              /> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Wrapper>
  );
}

const mapStateToProps = (state) => ({
  items: state.items,
});

export default withRouter(
  connect(mapStateToProps, { fetchItems, addToCart, allCarts })(MostRated),
);
