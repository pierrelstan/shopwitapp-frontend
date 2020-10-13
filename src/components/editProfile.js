import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PhotoCameraRoundedIcon from '@material-ui/icons/PhotoCameraRounded';
import { loadUser, updateProfile } from '../redux/actions/auth';

const useStyles = (theme) => ({
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
    opacity: 0.2,
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
});

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      firstname: '',
      lastname: '',
      avatar: '',
      location: '',
      disabled: false,
    };
    this.uploadedImage = React.createRef(null);
    this.imageUploader = React.createRef(null);
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = this.uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;

        this.setState({
          avatar: e.target.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };
  handleChange = () => {};
  handleSubmit = () => {};
  componentDidMount() {
    this.props.loadUser();
    if (this.props.auth.user) {
      this.setState({
        firstname: this.props.auth.user.firstname,
        lastname: this.props.auth.user.lastname,
        email: this.props.auth.user.email,
        avatar: this.props.auth.avatar,
        userId: this.props.auth.user._id,
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          variant='outlined'
          color='primary'
          onClick={this.handleClickOpen}
        >
          EDIT PROFILE
        </Button>
        <Dialog
          open={this.state.open}
          //   keepMounted
          scroll={this.state.scroll}
          onClose={this.handleClose}
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'
        >
          <div
            style={{
              margin: '20px',
            }}
          >
            <form
              className={classes.form}
              noValidate
              onSubmit={this.handleSubmit}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '46px',
                }}
              >
                <div>
                  <Button
                    onClick={this.handleClose}
                    color='primary'
                    style={{ marginRight: '10px' }}
                  >
                    <CloseIcon />
                  </Button>
                  Edit Profile
                </div>

                <Button
                  onClick={this.handleClose}
                  color='primary'
                  type='submit'
                >
                  Save
                </Button>
              </div>
              <div>
                {!this.props.auth ? (
                  ''
                ) : (
                  <div>
                    <div className={classes.container_Profile}>
                      <div>
                        <input
                          type='file'
                          accept='image/*'
                          multiple='false'
                          onChange={this.handleImageUpload}
                          ref={this.imageUploader}
                          style={{
                            display: 'none',
                          }}
                        />

                        <div onClick={() => this.imageUploader.current.click()}>
                          <img
                            className={classes.avatar}
                            ref={this.uploadedImage}
                            alt='profile_image'
                            src={this.props.avatar}
                          />
                          <div>
                            <PhotoCameraRoundedIcon />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <TextField
                //   error={Errors}
                // variant='standard-password-input'
                margin='normal'
                required
                fullWidth
                id='firstName'
                label='First Name'
                name='firstName'
                // autoComplete='firstName'
                // autoFocus
                //   value={user.email}
                onChange={this.handleChange}
                value={this.state.firstname}
              />
              <TextField
                //   error={Errors}

                // variant='outlined'
                margin='normal'
                name='lastName'
                label='LastName'
                id='lastName'
                fullWidth
                //   value={user.password}
                autoComplete='current-password'
                onChange={this.handleChange}
                value={this.state.lastname}
              />

              <TextField
                //   error={Errors}

                // variant='outlined'
                margin='normal'
                name='location'
                label='Location'
                id='location'
                fullWidth
                //   value={user.password}
                onChange={this.handleChange}
              />
            </form>
          </div>
        </Dialog>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  update: state.auth.update,
});

export default withStyles(useStyles)(
  connect(mapStateToProps, { loadUser })(EditProfile),
);
