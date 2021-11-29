import React, {useState}from 'react';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import ListItems from './ListItems';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ModalItemDetails from './ModalItemDetails';

const useStyles = makeStyles((theme) => ({
center : {
  display: 'flex',
  justifyContent: 'center',
}
}));

function ShopAll() {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [idItem, setIdItem]= useState('');

  const { itemsPerPages, loading } = useSelector((state) => ({
    itemsPerPages: state.pages.itemsPerPages,
    loading: state.pages.isLoadingPages,
  }));

  const handleClickOpen = (id) => {
    setOpen(true);
    if(id){
  setIdItem(id);}
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (!loading) {
    return (
      <div
      className={classes.center}
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
              image={data.imageUrl}
              description={data.description}
              handleClickOpen={handleClickOpen}
            />
          ))}
      </Grid>
      <ModalItemDetails
        open={open}
        handleClose={handleClose}
         id={idItem}
       />
    </div>
  );
}

export default ShopAll;
