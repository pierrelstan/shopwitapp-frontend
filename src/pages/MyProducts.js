import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Titles from '../components/Titles';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Container } from '@material-ui/core';
import { fetchItemsByUserId } from '../redux/actions/ItemsActions';
import { BACKEND_URL } from '../config';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
  },
  container: {
    width: 'auto',
    margin: 0,
    [theme.breakpoints.between('1200', '1368')]: {
      width: '1080px',
      margin: '0 auto',
    },
  },
  containerItems: {
    display: 'grid',
    gridTemplateColumns: '320px 320px 320px 320px',
    justifyItems: 'center',
    gap: '42px',
    margin: '20px',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      gridTemplateColumns: '1fr 1fr',
    },
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
      gridTemplateColumns: '1fr 1fr',
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
      gridTemplateColumns: '320px',
    },
    [theme.breakpoints.between('1200', '1368')]: {
      gridTemplateColumns: '320px 320px 320px',
    },
  },
  textLink: {
    textDecoration: 'none',
    color: '#333',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  imageCard: {
    // width: '100%',
    // height: 'auto',
    maxWidth: '317px',
    verticalAlign: 'middle',
    position: 'relative',
    top: '-88px',
    objectFit: 'cover',
    margin: 0,
    padding: 0,
    width: '322px',
    height: '304px',
    zIndex: 1,
    // objectFit: 'cover',
    '&:hover': {
      boxShadow: 'none',
    },
    [theme.breakpoints.between('sm', 'lg')]: {
      objectFit: 'cover',
    },
    [theme.breakpoints.only('xs')]: {
      objectFit: 'contain',
      position: 'relative',
      top: '-89px',
    },
    [theme.breakpoints.up('sm')]: {
      objectFit: 'cover',
    },
    [theme.breakpoints.down('sm')]: {
      objectFit: 'cover',
      top: '-180px',
    },
    [theme.breakpoints.down('md')]: {
      objectFit: 'cover',
      top: '-80px',
    },
  },
  card: {
    width: '347px',
    height: '337px',
    position: 'relative',
    borderRadius: '24px',
    transition: '0.5s ease-in-out ',
    zIndex: 1,
    [theme.breakpoints.down('xs')]: {
      width: '277px',
      height: '296px',
    },
    boxShadow:
      ' 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2)',
  },

  price: {
    color: '#ffffff',
    borderRadius: '50%',
    backgroundColor: '#d13c6f',
    width: '60px',
    height: '60px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '18px',
    zIndex: 2,
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
}));

function MyProducts({ products, isLoaded, auth }) {
  const classes = useStyles();

  React.useEffect(() => {
    if (auth.user._id) {
      fetchItemsByUserId(auth.user._id);
    }
  }, [auth.user._id]);
  if (!isLoaded) {
    return (
      <Container maxWidth='xl'>
        <Titles>My Products</Titles>
        <div>
          <CircularProgress color='secondary' />
        </div>
      </Container>
    );
  }
  return (
    <Container maxWidth='xl'>
      <div className={classes.container}>
        <Titles>My Products</Titles>
        <div className={classes.containerItems}>
          {products?.map((data) => (
            <Card className={classes.card} key={data.title} elevation={1}>
              <Link
                component={RouterLink}
                to={`/item/${data._id}`}
                className={classes.textLink}
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

                <img
                  alt={data.title}
                  src={`${BACKEND_URL}/${data.imageUrl}`}
                  title={data.title}
                  className={classes.imageCard}
                />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  products: state.myProducts.myProducts,
  isLoaded: state.myProducts.isLoaded,
});

export default connect(mapStateToProps, { fetchItemsByUserId })(
  React.memo(MyProducts, (prev, next) => {
    if (prev.products === next.products) {
      return true;
    }
  })
);
