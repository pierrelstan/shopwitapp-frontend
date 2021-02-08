import React from 'react';
import { useSelector } from 'react-redux';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Controller,
  Thumbs,
  Autoplay,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Rating } from '@material-ui/lab';

import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { CircularProgress } from '@material-ui/core';
import Titles from './Titles';
import Wrapper from './Wrapper';

SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Controller,
  Thumbs,
  Autoplay,
]);

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
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
    width: '331px',
    height: '337px',
    objectFit: 'cover',

    [theme.breakpoints.down('xs')]: {
      width: '241px',
      height: '200px',
    },
    [theme.breakpoints.between('1200', '1368')]: {
      width: '321px',
    },
  },

  card: {
    width: '100%',
    maxWidth: '347px',
    marginBottom: '40px',
    marginTop: '40px',
    borderRadius: '24px',
    boxShadow:
      ' 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '247px',
      height: '237px',
    },
  },

  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    overflow: 'auto',
    margin: 0,
    padding: 0,
    listStyle: 'none',
    height: '100%',
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  rating: {
    paddingLeft: '30px',
  },
}));

function MostRated() {
  const classes = useStyles();
  const [value] = React.useState(0);

  const { lastProducts, loading } = useSelector((state) => ({
    lastProducts: state.lastProducts.lastProducts,
    loading: state.lastProducts.isLoadingLast10Products,
  }));

  if (loading) {
    return (
      <div>
        <Titles>LAST PRODUCTS</Titles>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div>
      <Titles>MOST RATED</Titles>
      <div>
        <Swiper
          loop={true}
          navigation
          spaceBetween={10}
          slidesPerView={4}
          centeredSlides={false}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
          breakpoints={{
            320: {
              width: 320,
              slidesPerView: 1,
              spaceBetween: 5,
              centeredSlides: true,
            },
            430: {
              width: 430,
              slidesPerView: 1,
            },
            520: {
              width: 520,
              slidesPerView: 2,
            },
            900: {
              width: 900,
              slidesPerView: 3,
            },
            1190: {
              width: 1190,
              slidesPerView: 4,
              spaceBetween: 1,
            },
          }}
        >
          {lastProducts &&
            lastProducts.map((data) => (
              <SwiperSlide key={data._id}>
                <div className={classes.card}>
                  <div className={classes.container_image}>
                    <Link
                      href={`/item/${data._id}`}
                      className={classes.textLink}
                    >
                      <img
                        src={data.imageUrl}
                        alt={data.title}
                        className={classes.imageCard}
                      />
                    </Link>
                    <div>
                      {' '}
                      <Rating
                        className={classes.rating}
                        name='simple-controlled'
                        defaultValue={2}
                        value={value}
                        emptyIcon={<StarBorderIcon fontSize='inherit' />}
                        // onChange={handleRating}
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MostRated;
