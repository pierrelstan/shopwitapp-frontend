import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { pagesControlled } from '../redux/actions/pages';
import { fetchItems } from '../redux/actions/ItemsActions';
import ShopAll from './ShopAll';
import { Paper } from '@material-ui/core';
import SearchFromPagination from './SearchFromPagination';

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

function PaginationControlled({ itemsPerPages, items, pagesControlled }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    pagesControlled(page);
  }, [page]);

  return (
    <div>
      <div className={classes.root}>
        <Pagination
          className={classes.pagination}
          count={
            (items.length / 10) % 2 === 0
              ? Math.round(items.length / 10 + 1)
              : Math.floor(items.length / 10 + 1)
          }
          page={page}
          onChange={handleChange}
          style={{ color: '#cb436b' }}
        />
      </div>

      <ShopAll itemsPerPages={itemsPerPages} page={page} />

      <div className={classes.root}>
        <Typography>Page: {page}</Typography>
        <Pagination
          className={classes.pagination}
          count={
            (items.length / 10 + 1) % 2 === 0
              ? Math.round(items.length / 10 + 1)
              : Math.floor(items.length / 10 + 1)
          }
          page={page}
          onChange={handleChange}
          style={{ color: '#cb436b' }}
        />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  itemsPerPages: state.pages.itemsPerPages,
  items: state.items.items,
  page: state.pages.page,
});

export default withRouter(
  connect(mapStateToProps, { pagesControlled })(PaginationControlled),
);
