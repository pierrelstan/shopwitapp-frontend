import React, { useEffect, useState  } from 'react';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller , useController} from 'react-hook-form';
import { useHistory } from 'react-router-dom';
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
import { CircularProgress } from '@material-ui/core';
import { CreateItem } from '../redux/actions/ItemsActions';
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

    imageUrl: Yup.mixed().test("fileSize", "The file is too large", (value) => {
      if (!value.length) return true // attachment is optional
      return value[0].size <= 2000000
    })
});

const Sell = ({CreateItem}) => {
  const [open, setOpen] = useState(false);
  const [Product, setProduct] = useState({});
  const [PreviewImage, setPreviewImage] = useState('');

  let history = useHistory();
  const { handleSubmit, register, control , formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema)
  });
  const { field } = useController({ control });

  const classes = useStyles();

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };


  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(reader.result);
        setProduct({ ...Product, imageUrl: file });
      };

      reader.readAsDataURL(file);
    }
  };

  const OnSubmit = (data) => {
    const {
      imageUrl,
    } = Product;
const {
  title,
  description,
  price,
  quantityProducts,
  gender
} = data;
    let formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', imageUrl);
    formData.append('quantity', quantityProducts);
    formData.append('price', price);
    formData.append('gender', gender);
    CreateItem(formData, history);
    reset();
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
            <form className={classes.form} noValidate  onSubmit={handleSubmit(OnSubmit)}>
                  <Controller
                    rules={{ required: true }}
                    control={control}
                    defaultValue='women'
                    name='gender'
                    render={({ field }) => (
                      <RadioGroup {...field}>
                        <FormControlLabel
                       value='women'
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
                <div style={{ display: 'flex', gap: '30px' }}>
                <TextField
                error={true}
                margin='normal'
                type='file'
                accept='image/*'
                name='imageUrl'
                label='Add image'
                multiple={false}
                id='imageUrl'
                {...register('imageUrl', { required: true })}
                className={classes.input}
                onChange={(e) => {
                  let file = e.target.files;
                  handleImageUpload(e);
                  field.onChange(file);
                  console.log(field);
                }}
              />
              <label htmlFor='imageUrl' style={{
                display:'flex',
                flexDirection:'column'
              }}>
                Add an image:
                <Button variant='contained' color='primary' component='span'>
                  Upload
                </Button>
              </label>
              {errors.imageUrl?.type === 'required' && " Image is required"}
              </div>
            <Controller
              name="price"
              control={control}
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
  );
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProps, { CreateItem })(Sell);
