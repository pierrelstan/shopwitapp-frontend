import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import PhotoCameraRoundedIcon from '@material-ui/icons/PhotoCameraRounded';
import { loadUser, updateProfile } from '../redux/actions/auth';
import SickButton from '../Styles/SickButton';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
  },
  avatar: {
    display: 'inline-block',
    position: 'relative',
    width: '150px',
    height: '150px',
    overflow: 'hidden',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '5px solid #eee',
  },
  avatarOpacity: {
    display: 'inline-block',
    position: 'relative',
    width: '150px',
    height: '150px',
    overflow: 'hidden',
    borderRadius: '50%',
    objectFit: 'cover',
    opacity: 0.4,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  buttonEdit: {
    position: 'relative',
    marginRight: '30px',
  },
  colorButtonEdit: {
    color: 'blue',
  },
  colorButtonEditFalse: {
    color: '#333',
  },
  submit: {
    position: 'absolute',
    borderRadius: '10%',
    left: '190px',
  },
  containerProfile: {
    display: 'flex',
    justifyContent: 'center',
  },
  loading: {
    position: 'absolute',
    top: '127px',
    left: '66px',
  },
  container_Profile: {
    display: 'grid',
    gridTemplateColumns: '150px 300px ',
  },
  containerCameraIcon: {
    position: 'absolute',
    top: '180px',
    left: '80px',
    color: '#333',
  },
  button: {
    padding: '10px 20px',
  },
}));

const EditProfile = (props) => {
  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = React.useState('');

  const [User, setUser] = React.useState({
    firstname: '',
    email: '',
  });

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setUser({ ...User, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(User);
      // await props.updateProfile(userId, avatar, firstname, lastname, location);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    console.table(props.auth.user);
    // if (props.auth.user) {
    setUser({
      ...User,
      firstname: props.auth.user.firstname,
      email: props.auth.user.email,
    });

    setUserId(props.auth.user._id);
    // }
  }, []);

  // shouldComponentUpdate(nextProps, nextState) {
  //   // check if the state.user is null
  //   if (nextState.user === null) {
  //     this.props.loadUser();
  //     return true;
  //   }

  //   return true;
  // }

  return (
    <div>
      <Button
        variant='outlined'
        disableRipple
        color='primary'
        onClick={handleClickOpen}
        evalation={3}
        style={{ fontSize: '12px' }}
      >
        EDIT PROFILE
      </Button>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <div
          style={{
            margin: '20px',
          }}
        >
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '46px',
              }}
            >
              <div>
                <SickButton
                  onClick={handleClose}
                  color='primary'
                  style={{ marginRight: '10px' }}
                >
                  <CloseIcon />
                </SickButton>
                Checkout
              </div>

              <Button onClick={handleClose} color='primary' type='submit'>
                Save
              </Button>
            </div>

            <TextField
              margin='normal'
              required
              fullWidth
              id='firstname'
              label='First Name'
              name='firstname'
              type='text'
              onChange={handleChange}
              // value={User.firstname}
              defaultValue={User.firstname}
            />
            <TextField
              type='text'
              margin='normal'
              name='email'
              label='Email'
              id='email'
              fullWidth
              // value={User.lastname}
              onChange={handleChange}
              defaultValue={User.email}
            />

            {/* <TextField
              margin='normal'
              name='location'
              label='location'
              id='location'
              fullWidth
              value={location}
              onChange={handleChange}
            /> */}
          </form>
        </div>
      </Dialog>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  update: state.auth.update,
});

export default connect(mapStateToProps, { loadUser, updateProfile })(
  React.memo(EditProfile, (nextProps, PrevProps) => {
    if (nextProps === PrevProps) {
      nextProps.loadUser();
      return true;
    }
  }),
);
