import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import { connect } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { CircularProgress } from '@material-ui/core';
import { CreateItem } from '../redux/actions/ItemsActions';
import Titles from '../components/Titles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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
  square: {
    height: '400px',
    width: '300px',
    backgroundColor: '#e3e3e3',
  },
  input: {
    display: 'none',
  },
}));
const iniTialState = {
  title: '',
  description: '',
  price: '',
  imageUrl: '',
  quantityProducts: '',
  gender: 'women',
};
const Sell = ({ CreateItem, history }) => {
  const [product, setProduct] = React.useState(iniTialState);
  const [open, setOpen] = React.useState(false);
  const [PreviewImage, setPreviewImage] = React.useState();

  const classes = useStyles();
  const handleToggle = () => {
    setOpen((prev) => !prev);
  };
  console.log(product.gender);
  React.useEffect(() => {
    if (alert.length === 1) {
      setOpen(false);
    }
  }, []);
  const uploadedImage = React.useRef();

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(reader.result);
        setProduct({ ...product, imageUrl: file });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('description', product.description);
    formData.append('image', product.imageUrl);
    formData.append('quantity', product.quantityProducts);
    formData.append('price', product.price);
    formData.append('gender', product.gender);
    CreateItem(formData, history);
  };

  return (
    <div>
      <Container component='main' maxWidth='md'>
        <Titles>Add Product</Titles>
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
            {PreviewImage && (
              <img
                src={PreviewImage}
                alt='preview'
                style={{
                  width: '320px',
                }}
              />
            )}
            {!PreviewImage && <div className={classes.square}></div>}
          </div>
          <div>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <FormLabel component='legend'>For:</FormLabel>
              <RadioGroup
                aria-label='gender'
                name='gender'
                value={product.gender}
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
                value={product.title}
                onChange={handleChange}
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
                margin='normal'
                required={true}
                fullWidth
                name='price'
                label='Price'
                id='price'
                value={product.price}
                type='number'
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>$</InputAdornment>
                  ),
                }}
                min='0'
                max='10000'
                variant='filled'
              />

              <TextField
                margin='normal'
                required={true}
                fullWidth
                id='quantityProducts'
                label='Quantity'
                name='quantityProducts'
                autoComplete='quantityProducts'
                value={product.quantityProducts}
                onChange={handleChange}
                defaultValue={0}
                variant='filled'
                type='number'
                min='0'
                max='10000'
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
                    <CircularProgress
                      color='inherit'
                      thickness={2.3}
                      size={30}
                    />
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProps, { CreateItem })(Sell);
