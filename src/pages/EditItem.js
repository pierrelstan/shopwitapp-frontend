import React, { useState, useEffect, useRef } from 'react';
import { withRouter, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { updateItem, fetchItemById } from '../redux/actions/ItemsActions';
import Titles from '../components/Titles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3),
  },
  containerSubmit: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  title: {
    textAlign: 'center',
    margin: '30px',
  },
  image: {
    width: '320px',
  },
}));
const EditItem = ({ item, updateItem, userId, fetchItemById }) => {
  const [product, setProduct] = useState({
    id: '',
    title: '',
    description: '',
    price: '',
    imageUrl: '',
    quantityProducts: '',
    userId: '',
  });
  let { id } = useParams();
  let history = useHistory();

  const uploadedImage = useRef();
  const classes = useStyles();
  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target;
        setProduct({ ...product, imageUrl: e.target.result });
      };

      reader.readAsDataURL(file);
    }
  };
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchItemById(id);
    setProduct((prevState) => ({
      ...prevState,
      id: item.item.id,
      title: item.item.title,
      description: item.item.description,
      price: item.item.price,
      imageUrl: item.item.imageUrl,
      quantityProducts: item.item.quantityProducts,
      userId: item.item.userId,
    }));
  }, [
    fetchItemById,
    id,
    item.item.description,
    item.item.id,
    item.item.imageUrl,
    item.item.price,
    item.item.quantityProducts,
    item.item.title,
    item.item.userId,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let update = updateItem(id, product, userId);
    if (update) {
      history.push(`/myproducts/${userId}`);
    }
  };

  const { title, description, imageUrl, price, quantityProducts } = product;
  if (!item.isLoaded) {
    return (
      <Container component='main' maxWidth='md'>
        <Titles> Edit Product</Titles>
      </Container>
    );
  }
  return (
    <Container component='main' maxWidth='md'>
      <Titles> Edit Product</Titles>
      <CssBaseline />
      <div>
        <Typography variant='h4' className={classes.title}></Typography>
        <div>
          <div>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                variant='outlined'
                margin='normal'
                required={true}
                fullWidth
                id='title'
                label='Title'
                name='title'
                autoComplete='title'
                value={product.title}
                onChange={handleChange}
                defaultValue={title}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required={true}
                fullWidth
                name='description'
                label='Description'
                id='description'
                autoComplete='description'
                value={product.description}
                onChange={handleChange}
                defaultValue={description}
              />
              <div
                style={{
                  display: 'flex',
                  gap: '30px',
                  alignItems: 'center',

                  height: '234px',
                }}
              >
                <TextField
                  margin='normal'
                  required={true}
                  type='file'
                  accept='image/*'
                  name='imageUrl'
                  label='Add image'
                  multiple='false'
                  id='imageUrl'
                  autoComplete='imageUrl'
                  ref={uploadedImage}
                  // value={product.imageUrl}
                  onChange={handleImageUpload}
                />
                <div
                  style={{
                    display: 'grid',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt='preview'
                      style={{
                        width: '320px',
                      }}
                    />
                  )}
                </div>
              </div>
              <TextField
                variant='outlined'
                margin='normal'
                required={true}
                fullWidth
                name='price'
                label='Price'
                id='price'
                autoComplete='price'
                value={product.price}
                onChange={handleChange}
                defaultValue={price}
              />

              <TextField
                variant='outlined'
                margin='normal'
                required={true}
                fullWidth
                id='quantityProducts'
                label='Quantity'
                name='quantityProducts'
                autoComplete='quantityProducts'
                value={product.quantityProducts}
                onChange={handleChange}
                defaultValue={quantityProducts}
              />
              <div className={classes.containerSubmit}>
                <Button
                  type='submit'
                  variant='outlined'
                  color='primary'
                  className={classes.submit}
                  value='Submit'
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  item: state.item,
  userId: state.auth.user._id,
});
export default connect(mapStateToProps, { updateItem, fetchItemById })(
  React.memo(EditItem, (prev, next) => {
    if (prev.item.item === next.item.item) {
      return true;
    }
  }),
);
