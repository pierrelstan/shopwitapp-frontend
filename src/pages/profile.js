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
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import EditProfile from '../components/editProfile';
import Footer from '../components/Footer';

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
}));
const Profile = (props) => {
  const [User, setUser] = React.useState({
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
  });

  const classes = useStyles();

  React.useEffect(() => {
    setUser((prev) => ({
      ...prev,
      greetingTheName: props.auth.user.firstname,
      firstname: props.auth.user.firstname,
      lastname: props.auth.user.lastname,
      email: props.auth.user.email,
      avatar: props.auth.user.avatar,
      userId: props.auth.user._id,
    }));
  }, [props.auth.avatar, props.auth.user]);

  const { lastname, userId, firstname, avatar } = User;

  return (
    <Container maxWidth='lg'>
      <div
        style={{
          width: '100%',
          height: '939px',
        }}
      >
        <div>
          <div>
            <div>
              <div>
                <div className={classes.container_Profile}>
                  <div>
                    <img
                      className={`${classes.avatar}`}
                      alt='profile_image'
                      src={avatar}
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
                      avatar={avatar}
                      firstname={firstname}
                      lastname={lastname}
                      userId={userId}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Typography
              variant='h4'
              style={{
                margin: '20px',
              }}
            >
              {firstname}
            </Typography>
          </div>
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
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  update: state.auth.update,
  success: state.auth.message,
});
export default connect(mapStateToProps, { loadUser, updateProfile })(Profile);

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
