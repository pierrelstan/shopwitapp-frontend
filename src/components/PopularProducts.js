import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress, Grid } from '@material-ui/core';
import Titles from './Titles';
import ListItems from './ListItems';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: '12px',
  },
  centered: {
    marginTop: '100px',
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    color: '#d13c6f',
    borderColor: '#d13c6f',
    padding: '8px 42px',
  },
}));

function PopularProducts() {
  const classes = useStyles();

  let history = useHistory();

  const { lastProducts, loading } = useSelector((state) => ({
    lastProducts: state.items.items,
    loading: state.lastProducts.isLoadingLast10Products,
  }));
  const handleViewAllClick = () => {
    history.push('/shop');
  };
  if (loading) {
    return (
      <div>
        <Titles>LAST PRODUCTS</Titles>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <Titles>LAST PRODUCTS</Titles>
      <div>
        <Grid container spacing={3}>
          {lastProducts &&
            lastProducts.map((data) => (
              <ListItems
                key={data._id}
                id={data._id}
                price={data.price}
                title={data.title}
                image={data.imageUrl}
                description={data.description}
              />
            ))}
        </Grid>
        <div className={classes.centered}>
          <Button
            variant='outlined'
            onClick={handleViewAllClick}
            className={classes.button}
          >
            View all
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PopularProducts;
