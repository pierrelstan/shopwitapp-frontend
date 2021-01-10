import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Wrapper from '../components/Wrapper';
import { fetchItemsByUserId } from '../redux/actions/ItemsActions';

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
    width: '100%',
    height: 'auto',
    MaxWidth: '347px',
    position: 'relative',
    top: '-175px',
    objectFit: 'cover',
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
    [theme.breakpoints.down('sm')]: {
      objectFit: 'cover',
      top: '-130px',
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

function MyProducts({ auth, fetchItemsByUserId, products }) {
  const classes = useStyles();

  React.useEffect(() => {
    const USER_ID = auth.user._id;
    fetchItemsByUserId(USER_ID);
  }, [auth.user._id, fetchItemsByUserId]);

  return (
    <Wrapper>
      <div className={classes.container}>
        {products.length !== 0 ? (
          <h1
            style={{
              textAlign: 'center',
              textTransform: 'uppercase',
              marginBottom: '40px',
            }}
          >
            My Products
          </h1>
        ) : (
          <h1
            style={{
              textAlign: 'center',
              textTransform: 'uppercase',
              marginBottom: '40px',
            }}
          >
            Products empty
          </h1>
        )}
        <div className={classes.containerItems}>
          {products &&
            products.map((data) => (
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
                    src={data.imageUrl}
                    title={data.title}
                    className={classes.imageCard}
                  />
                </Link>
              </Card>
            ))}
        </div>
      </div>
    </Wrapper>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  products: state.items.myProducts,
});

export default connect(mapStateToProps, { fetchItemsByUserId })(
  withRouter(MyProducts),
);
