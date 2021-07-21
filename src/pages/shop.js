import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import Link from '@material-ui/core/Link';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NewArrivals from '../components/NewArrivals';
import ShopAll from '../components/ShopAll';
import ScrollOnTop from '../components/ScrollOnTop';
import pages from '../utils/pages';
import { PagesShop } from '../redux/actions/Pageshop';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      display: 'flex',
      // justifyContent: 'center',
      margin: '40px',
    },
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    margin: '40px',
  },

  search: {
    justifySelf: 'end',
    [theme.breakpoints.down('xs')]: {
      gridColumnStart: 1,
      gridRowStart: 1,
      justifySelf: 'start',
    },
    [theme.breakpoints.down('sm')]: {
      justifySelf: 'start',
    },
  },
}));

function Shop() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);

  const { items } = useSelector((state) => ({
    items: state.pages.itemsPerPages,
    page: state.pages.page,
  }));

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(PagesShop(page));
  }, [dispatch, page]);

  return (
    <div>
      <NewArrivals />
      <Container maxWidth='xl'>
        <ScrollOnTop />

        <Breadcrumbs
          maxItems={2}
          aria-label='breadcrumb'
          style={{
            marginTop: '10px',
          }}
        >
          <Link
            color='textPrimary'
            style={{
              cursor: 'pointer',
            }}
          >
            Home
          </Link>

          <Typography color='inherit' variant='h6'>
            Shop
          </Typography>
        </Breadcrumbs>

        <Typography
          variant='h6'
          style={{
            paddingTop: '50px',
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '30px',
          }}
        >
          Shop All
        </Typography>

        <div>
          <div className={classes.root}>
            <Pagination
              className={classes.pagination}
              count={pages(items)}
              page={page}
              onChange={handleChange}
              style={{ color: '#cb436b' }}
            />
          </div>

          <ShopAll page={page} />

          <div className={classes.root}>
            <Typography>Page: {page}</Typography>
            <Pagination
              className={classes.pagination}
              count={pages(items)}
              page={page}
              onChange={handleChange}
              style={{ color: '#cb436b' }}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
export default Shop;
