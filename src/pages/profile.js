import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditIcon from '@material-ui/icons/Edit';
import { loadUser, updateProfile } from '../redux/actions/auth';
// import MyProducts from '../components/MyProducts';
import {
  TextField,
  Container,
  Paper,
  Typography,
  Button,
} from '@material-ui/core';
import clsx from 'clsx';
import EditProfile from '../components/editProfile';

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
    gridTemplateColumns: '150px 1fr ',
    gridGap: '20px',
  },
});
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      greetingTheName: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      userId: '',
      error: null,
      disabled: true,
      avatar: '',
      update: false,
      edit: false,
      carts: [],
      user: null,
      transarant: '',
      successful: false,
    };
  }

  componentDidMount() {
    if (this.props.auth.user) {
      this.setState({
        greetingTheName: this.props.auth.user.firstname,
        firstname: this.props.auth.user.firstname,
        lastname: this.props.auth.user.lastname,
        email: this.props.auth.user.email,
        avatar: this.props.auth.avatar,
        userId: this.props.auth.user._id,
      });
    }
  }

  render() {
    const { lastname, userId } = this.state;
    const { classes } = this.props;
    const { user, firstname } = this.props.auth;
    return (
      <div>
        <Container maxWidth='lg'>
          <div
            style={{
              width: '100%',
              height: '939px',
            }}
          >
            <div>
              <form onSubmit={this.handleSubmit} className={classes.form}>
                <div>
                  <div>
                    {!this.props.auth ? (
                      ''
                    ) : (
                      <div>
                        <div className={classes.container_Profile}>
                          <div>
                            <img
                              className={`${
                                this.state.disabled === true
                                  ? classes.avatar
                                  : classes.avatarOpacity
                              }`}
                              ref={this.uploadedImage}
                              alt='profile_image'
                              src={user.avatar}
                              disabled={this.state.disabled}
                            />
                          </div>

                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              flexWrap: 'wrap',
                              marginLeft: '20px',
                            }}
                          >
                            <EditProfile
                              avatar={user.avatar}
                              firstname={firstname}
                              lastname={lastname}
                              userId={userId}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <Typography
                    variant='h4'
                    style={{
                      margin: '20px',
                    }}
                  >
                    {user.firstname}
                  </Typography>
                </div>
              </form>
            </div>
            <div>
              {menu.map((menu) => (
                <Button
                  variant='outlined'
                  color='primary'
                  style={{
                    margin: '10px',
                  }}
                >
                  {menu.name}
                </Button>
              ))}
            </div>

            <div>
              {menu2.map((menu) => (
                <Button
                  variant='outlined'
                  color='primary'
                  style={{
                    margin: '10px',
                  }}
                >
                  {menu.name}
                </Button>
              ))}
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  update: state.auth.update,
});
export default withStyles(useStyles)(
  connect(mapStateToProps, { loadUser, updateProfile })(Profile),
);

const menu = [
  {
    name: 'Shipping Address',
  },
  {
    name: 'Payment Method',
  },
  {
    name: 'Order History',
  },
  {
    name: 'Delivery Status',
  },
  {
    name: 'Language',
  },
];

const menu2 = [
  {
    name: 'Notification Settings',
  },
  {
    name: 'Privacy Policy',
  },
  {
    name: 'Frequently Asked Quetions',
  },
  {
    name: 'Legal Information',
  },
  {
    name: 'Rate Our Information',
  },
];
