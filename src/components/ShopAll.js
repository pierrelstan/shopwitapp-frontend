import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';

import ListItems from './ListItems';
import { CircularProgress } from '@material-ui/core';
import {BACKEND_URL} from "../config"

function ShopAll() {
  const { itemsPerPages, loading } = useSelector((state) => ({
    itemsPerPages: state.pages.itemsPerPages,
    loading: state.pages.isLoadingPages,
  }));

  if (!loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <div>
      <Grid container spacing={3}>
        {itemsPerPages &&
          itemsPerPages.map((data) => (
            <ListItems
              id={data._id}
              price={data.price}
              title={data.title}
              image={`${BACKEND_URL}/${data.imageUrl}`}
              description={data.description}
            />
          ))}
      </Grid>
    </div>
  );
}

export default ShopAll;
