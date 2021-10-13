import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';
import { Container } from '@material-ui/core';
import NewArrivals from '../components/NewArrivals';
import { pagesControlled } from '../redux/actions/pages';
import ShopAll from '../components/ShopAll';
import ScrollOnTop from '../components/ScrollOnTop';
import pages from '../utils/pages';
import MenuNavigation from '../components/MenuNavigation';

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

function Sneakers() {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const dispatch = useDispatch();

  const { items } = useSelector((state) => ({
    itemsPerPages: state.pages.itemsPerPages,
    items: state.items.items,
    page: state.pages.page,
  }));

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    let query = 'sneakers';

    dispatch(pagesControlled(page, query));

    return () => {
      cancelTokenSource.cancel();
    };
  }, [dispatch, page]);

  return (
    <div>
      <NewArrivals />
      <Container>
        <ScrollOnTop />

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
        <MenuNavigation />
      </Container>
    </div>
  );
}

export default Sneakers;
