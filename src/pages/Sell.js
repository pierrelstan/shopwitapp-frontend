import React, { useEffect, useState , useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { connect } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { CircularProgress } from '@material-ui/core';
import { CreateItem } from '../redux/actions/ItemsActions';
import Titles from '../components/Titles';
import InputAdornment from '@material-ui/core/InputAdornment';

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
    maxWidth: '600px',
  },
  input: {
    display: 'none',
  },
  image: {
    maxWidth: '600px',
    width: '300px',
  },
}));
const initialState = {
  title: '',
  description: '',
  price: '',
  file: '',
  quantityProducts: '',
  gender: 'women',
};

const validationSchema = yup.object({
  title: yup
    .string('Enter a title')
    .required('Title is required'),

  description: yup
    .string('Enter a description')
    .required('Description is required'),
    file: yup
    .string('Enter an image')
    .required('Image is required'),

    price: yup
    .string('Enter a price')
    .required('Price is required'),

    quantityProducts: yup
    .string('Enter a quantity')
    .required('Quantity is required'),
});

const Sell = ({ CreateItem, history }) => {
  const [open, setOpen] = useState(false);
  const [PreviewImage, setPreviewImage] = useState('');

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
    ...initialState
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('image', values.file);
      formData.append('quantity', values.quantityProducts);
      formData.append('price', values.price);
      formData.append('gender', values.gender);
      CreateItem(formData, history);
    },
  });

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const uploadPreviewImage=(file)=> {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(reader.result);

      };
      reader.readAsDataURL(file);
  }
  }


  useEffect(() => {
    uploadPreviewImage();
    if (alert.length === 1) {
      setOpen(false);
    }


  }, []);



  return (
    <div>
      <Container component='main' maxWidth='md'>
        <Titles>Add Product</Titles>
        <CssBaseline />
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <div>
              {PreviewImage && (
                <img
                  src={PreviewImage}
                  alt='preview'
                  className={classes.image}
                />
              )}
              {!PreviewImage && <div className={classes.square}></div>}
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
              <FormLabel component='legend'>Collections:</FormLabel>
              <RadioGroup
                aria-label='gender'
                name='gender'
                value={formik.values.gender}
                onChange={formik.handleChange}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
                helperText={formik.touched.gender && formik.errors.gender}
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
                value={formik.values.titlel}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
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
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
              <div style={{ display: 'flex', gap: '30px' }}>
                <TextField
                  margin='normal'
                  required={true}
                  type='file'
                  accept='image/*'
                  name='file'
                  label='Image'
                  inputProps={{id: "file"}}
                  multiple={false}
                  id='file'
                  autoComplete='file'
                  className={classes.input}
                  value={formik.values.image}
                  onChange={(event) => {
                  const file = event.currentTarget.files[0]
                    formik.setFieldValue("file", file);
                    uploadPreviewImage(file);
                }}
                  error={formik.touched.file && Boolean(formik.errors.file)}
                  helperText={formik.touched.file && formik.errors.file}
                />
                <label htmlFor='file'>
                  <Button variant='contained' color='primary' component='span'>
                    Upload
                  </Button>
                  {formik.touched.file && Boolean(formik.errors.file)}
                </label>
              </div>
              <TextField
                margin='normal'
                required={true}
                fullWidth
                name='price'
                label='Price'
                id='price'
                type='number'
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
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
                value={formik.values.quantityProducts}
                onChange={formik.handleChange}
                error={formik.touched.quantityProducts && Boolean(formik.errors.quantityProducts)}
                helperText={formik.touched.quantityProducts && formik.errors.quantityProducts}
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
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProps, { CreateItem })(Sell);
