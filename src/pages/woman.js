import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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

function Woman({ items, pagesControlled }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    let query = 'women';
    pagesControlled(page, query);
    return () => {
      cancelTokenSource.cancel();
    };
  }, [page, pagesControlled]);

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
const mapStateToProps = (state) => ({
  itemsPerPages: state.pages.itemsPerPages,
  items: state.items.items,
  page: state.pages.page,
});

export default withRouter(connect(mapStateToProps, { pagesControlled })(Woman));
