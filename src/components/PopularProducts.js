import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress, Grid } from '@material-ui/core';

import Titles from './Titles';
import ListItems from './ListItems';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function PopularProducts() {
  const classes = useStyles();

  let history = useHistory();

  const { lastProducts, loading } = useSelector((state) => ({
    lastProducts: state.lastProducts.lastProducts,
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
    <div style={{ paddingBottom: '12px' }}>
      <Titles>LAST PRODUCTS</Titles>
      <div>
        <Grid container spacing={3}>
          {lastProducts &&
            lastProducts.map((data) => (
              <ListItems
                id={data._id}
                price={data.price}
                title={data.title}
                image={data.imageUrl}
                description={data.description}
              />
            ))}
        </Grid>
        <div
          style={{
            marginTop: '100px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            variant='outlined'
            style={{
              color: '#d13c6f',
              borderColor: '#d13c6f',
              padding: '8px 42px',
            }}
            onClick={handleViewAllClick}
          >
            View all
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PopularProducts;
