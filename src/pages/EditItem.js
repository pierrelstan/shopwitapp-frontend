import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
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
import { CircularProgress, Grid } from '@material-ui/core';

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


const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(6, 'Title must be at least 6 characters')
    .max(10, 'Title must not exceed 10 characters'),
    description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(100, 'Description must not exceed 100 characters'),
    price: Yup.number().required('Price is required'),
    quantityProducts: Yup.number().required('Quantity is required'),
});

const EditItem = ({ item, updateItem, fetchItemById }) => {

  const [Product, setProduct] = useState({});
  let { id } = useParams();
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [PreviewImage, setPreviewImage] = useState();

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const classes = useStyles();

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

  const OnSubmit = (data) => {
console.log(data)

    const {
      title,
      description,
      price,
      quantityProducts,
      gender
    } = data;

    let formData = new FormData();
    formData.append('title', title);
    formData.append('id', id);
    formData.append('description', description);
    formData.append('image', Product.imageUrl);
    formData.append('quantity', quantityProducts);
    formData.append('price', price);
    formData.append('gender', gender);
    updateItem(id, formData, navigate);
  };


  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (alert.length >= 1) {
      setOpen(false);
    };
  }, []);


  const handleChange = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(reader.result);
        setProduct({ ...Product, imageUrl: file });
      };
      reader.readAsDataURL(file);
    }
  }

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
      <Grid container spacing={5}>
      <Grid item xs={12} sm={6}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
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
        </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <form className={classes.form} noValidate
          onSubmit={handleSubmit(OnSubmit)}
          >
            <FormLabel component='legend'>Collections:</FormLabel>
            <Controller
                    rules={{ required: true }}
                    control={control}
                    defaultValue={item.item.gender}
                    name='gender'
                    render={({ field }) => (
                      <RadioGroup {...field}>
                        <FormControlLabel
                       value='women'
                       margin='normal'
                       control={<Radio />}
                       label='Women'
                        />
                        <FormControlLabel
                          value='men' control={<Radio />} label='Men'
                        />
                        <FormControlLabel
                         value='sneakers'
                         control={<Radio />}
                         label='Sneakers'
                        />
                      </RadioGroup>
                    )}
                  />

            <Controller
              name="title"
              control={control}
              defaultValue={item.item.title}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label="Title"
                  margin='normal'
                  variant='outlined'
                  fullWidth
                  onChange={onChange}
                  value={value}
                  error={!!error}
                  helperText={error ? error.message : null}

                />
              )}
              rules={{ required: 'Title is required' }} />
              <Controller
              name="description"
              control={control}
              defaultValue={item.item.description}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label="Description"
                  margin='normal'
                  variant='outlined'
                  fullWidth
                  onChange={onChange}
                  value={value}
                  error={!!error}
                  helperText={error ? error.message : null}

                />
              )}
              rules={{ required: 'Description is required' }} />



              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                >
                <TextField
                margin='normal'
                 type='file'
                accept='image/*'
                name='file'
                label='Add image'
                multiple={false}
                id='file'
                autoComplete='imageUrl'
                onChange={handleChange}
                className={classes.input}

              />
              <label htmlFor='file'>
                <Button variant='contained' color='primary' component='span'>
                  Upload
                </Button>

              </label>
              <Button variant='contained' color='primary' component='span' >reset</Button>
              </Grid>


            <Controller
              name="price"
              control={control}
              defaultValue={item.item.price}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                name='price'
                label='Price'
                id='price'
                autoComplete='price'
                  onChange={onChange}
                  value={value}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: 'Price is required' }} />

              <Controller
              name="quantityProducts"
              control={control}
              defaultValue={item.item.quantityProducts}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                name='quantity'
                label='Quantity'
                id='price'
                autoComplete='quantity'
                  onChange={onChange}
                  value={value}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: 'Quantity is required' }} />

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
        </Grid>
      </Grid>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  item: state.item,
  userId: state.auth.user._id,
});
export default EditItem