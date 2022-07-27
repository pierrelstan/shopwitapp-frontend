import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress, Grid } from '@material-ui/core';
import Titles from './Titles';
import ListItems from './ListItems';
import ModalItemDetails from './ModalItemDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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

  const [open, setOpen] = useState(false);
  const [idItem, setIdItem] = useState('');

  const { lastProducts, loading } = useSelector((state) => ({
    lastProducts: state.items.items,
    loading: state.lastProducts.isLoadingLast10Products,
  }));

  const handleClickOpen = (id) => {
    setOpen(true);
    if (id) {
      setIdItem(id);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
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
    <div>
      <Titles>LAST PRODUCTS</Titles>
      <div>
        <Grid container className={classes.root} spacing={3}>
          {lastProducts &&
            lastProducts.map((data) => (
              <ListItems
                key={data._id}
                id={data._id}
                price={data.price}
                title={data.title}
                image={data.imageUrl}
                description={data.description}
                handleClickOpen={handleClickOpen}
              />
            ))}
        </Grid>
        <div className={classes.centered}>
          <Button
            variant="outlined"
            onClick={handleViewAllClick}
            className={classes.button}
          >
            View all
          </Button>
        </div>
      </div>
      <ModalItemDetails open={open} handleClose={handleClose} id={idItem} />
    </div>
  );
}

export default PopularProducts;
