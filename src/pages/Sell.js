import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { connect } from 'react-redux';
import { CreateItem } from '../redux/actions/ItemsActions';
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
}));
const iniTialState = {
  title: '',
  description: '',
  price: '',
  imageUrl: '',
  quantityProducts: '',
};
const Sell = ({ CreateItem, history }) => {
  const [product, setProduct] = React.useState(iniTialState);
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();
  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

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
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target;
        setProduct({ ...product, imageUrl: e.target.result });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    CreateItem(product, history);
  };

  return (
    <div>
      <Container component='main' maxWidth='md'>
        <Titles>Add Product</Titles>
        <CssBaseline />
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
