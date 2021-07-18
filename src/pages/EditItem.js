import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { updateItem, fetchItemById } from '../redux/actions/ItemsActions';
import Titles from '../components/Titles';
import { CircularProgress } from '@material-ui/core';

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
    width: '273px',
  },
  input: {
    display: 'none',
  },
  square: {
    height: '400px',
    width: '300px',
    backgroundColor: '#e3e3e3',
  },
}));
const EditItem = ({ item, updateItem, userId, fetchItemById }) => {
  const [Product, setProduct] = useState({
    id: '',
    title: '',
    description: '',
    price: '',
    imageUrl: '',
    quantityProducts: '',
    gender: 'women',
  });
  let { id } = useParams();

  let history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [PreviewImage, setPreviewImage] = React.useState();

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  React.useEffect(() => {
    if (alert.length === 1) {
      setOpen(false);
    }
  }, []);

  const uploadedImage = useRef();
  const classes = useStyles();
  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        setPreviewImage(reader.result);
        setProduct({ ...Product, imageUrl: file });
      };

      reader.readAsDataURL(file);
    }
  };
  const handleChange = (e) => {
    setProduct({ ...Product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchItemById(id);

    setProduct((prevState) => ({
      ...prevState,
      id: item.item._id,
      title: item.item.title,
      description: item.item.description,
      price: item.item.price,
      imageUrl: item.item.imageUrl,
      quantityProducts: item.item.quantityProducts,
      gender: item.item.gender,
    }));
  }, [
    fetchItemById,
    id,
    item.item.description,
    item.item._id,
    item.item.imageUrl,
    item.item.price,
    item.item.quantityProducts,
    item.item.title,
    item.item.gender,
  ]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      title,
      description,
      price,
      quantityProducts,
      imageUrl,
      id,
      gender,
    } = Product;
    let formData = new FormData();
    formData.append('title', title);
    formData.append('id', id);
    formData.append('description', description);
    formData.append('image', imageUrl);
    formData.append('quantity', quantityProducts);
    formData.append('price', price);
    formData.append('gender', gender);
    updateItem(id, formData, history);
  };
  const { title, description, price, quantityProducts, gender } = Product;
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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}
      >
        <div
          style={{
            display: 'grid',
            justifyContent: 'center',
            alignItems: 'center',
            width: '500px',
          }}
        >
          {Product.imageUrl && (
            <img
              src={!PreviewImage ? Product.imageUrl : PreviewImage}
              alt='preview'
              style={{
                width: '320px',
              }}
            />
          )}
        </div>

        <div>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <FormLabel component='legend'>For:</FormLabel>
            <RadioGroup
              aria-label='gender'
              name='gender'
              value={Product.gender ? Product.gender : ''}
              onChange={handleChange}
            >
              <FormControlLabel
                value='women'
                control={<Radio />}
                label='Women'
              />
              <FormControlLabel value='men' control={<Radio />} label='Men' />
              <FormControlLabel
                value='sneakers'
                control={<Radio />}
                label='Sneakers'
              />
            </RadioGroup>
            <TextField
              variant='outlined'
              margin='normal'
              required={true}
              fullWidth
              id='title'
              label='Title'
              name='title'
              autoComplete='title'
              value={Product.title}
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
              value={Product.description}
              onChange={handleChange}
              defaultValue={description}
            />

            <div style={{ display: 'flex', gap: '30px' }}>
              <input
                margin='normal'
                required={true}
                type='file'
                accept='image/*'
                name='imageUrl'
                label='Add image'
                multiple={false}
                id='imageUrl'
                autoComplete='imageUrl'
                ref={uploadedImage}
                className={classes.input}
                onChange={handleImageUpload}
              />
              <label htmlFor='imageUrl'>
                <Button variant='contained' color='primary' component='span'>
                  Upload
                </Button>
              </label>
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
              value={Product.price}
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
              value={Product.quantityProducts}
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
                onClick={handleToggle}
              >
                {!open ? (
                  'Submit'
                ) : (
                  <CircularProgress color='inherit' thickness={2.3} size={30} />
                )}
              </Button>
            </div>
          </form>
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
