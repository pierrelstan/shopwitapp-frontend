import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { Container } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NewArrivals from '../components/NewArrivals';
import { pagesControlled } from '../redux/actions/pages';
import ShopAll from '../components/ShopAll';

import ScrollOnTop from '../components/ScrollOnTop';
import pages from '../utils/pages';

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

function Shop({ itemsPerPages, items, pagesControlled }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    pagesControlled(page);
  }, [page, pagesControlled]);

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
const mapStateToProps = (state) => ({
  items: state.items.items,
  page: state.pages.page,
});

export default withRouter(connect(mapStateToProps, { pagesControlled })(Shop));
