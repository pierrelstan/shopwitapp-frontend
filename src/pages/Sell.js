import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

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
    marginBottom: '30px',
  },
}));
const iniTialState = {
  title: '',
  description: '',
  price: '',
  imageUrl: '',
  quantityProducts: '',
};
const Sell = (props) => {
  const [product, setProduct] = React.useState(iniTialState);
  const classes = useStyles();

  const handleChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/item/new', product, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        setProduct(iniTialState);
        props.history.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='container'>
      <ThemeProvider theme={theme}>
        <Typography variant='h4' className={classes.title}>
          Enter your Product infos
        </Typography>
      </ThemeProvider>
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
        <TextField
          variant='outlined'
          margin='normal'
          required={true}
          fullWidth
          name='imageUrl'
          label='Image'
          id='imageUrl'
          autoComplete='imageUrl'
          value={product.imageUrl}
          onChange={handleChange}
        />
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
  );
};

export default Sell;
