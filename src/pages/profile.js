import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import { loadUser } from '../redux/actions/auth';
// import MyProducts from '../components/MyProducts';
import {
  TextField,
  Container,
  Paper,
  Typography,
  Button,
} from '@material-ui/core';

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
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  buttonEdit: {
    position: 'relative',
    top: ' -118px',
    left: '62px',
  },
  colorButtonEdit: {
    color: 'blue',
  },
  colorButtonEditFalse: {
    color: '#eee',
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
    };

    this.uploadedImage = React.createRef(null);
    this.imageUploader = React.createRef(null);

    this._isMounted = false;
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextState.update);
    // check if the state.user is null
    if (!nextState.user === null) {
      // call loadUser from redux to return the user data
      this.props.loadUser();
      // this.setState({
      //   update: false,
      // });
      return true;
    }
    return true;
  }
  componentDidMount() {
    return this.props.loadUser();
  }
  componentWillMount() {
    // pass the user data loadUser to the state
    if (this.props.auth.user) {
      this.setState({
        greetingTheName: this.props.auth.user.firstname,
        firstname: this.props.auth.user.firstname,
        lastname: this.props.auth.user.lastname,
        email: this.props.auth.user.email,
        userId: this.props.auth.user._id,
      });
    }
  }

  //   fix error binding
  handleChange = (e) => {
    let target = e.target;
    this.setState({
      [target.name]: e.target.value,
    });
  };
  handleEdit = () => {
    this.setState((prevState) => ({
      disabled: !prevState.disabled,
      transarant: 'transparant',
    }));
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
  handleSubmit = async (e) => {
    e.preventDefault();

    const { firstname, lastname, email, password, avatar } = this.state;

    await axios
      .put(
        `http://localhost:4000/auth/user/${this.state.userId}/edit`,
        { firstname, lastname, email, avatar },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => {
        if (response) {
          this.setState({
            id: this.state.userId,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            email: response.data.email,
            avatar: response.data.avatar,
            update: true,
            disabled: true,
            transarant: '',
          });
          if (this.state.update === true) {
            return this.props.loadUser();
          }
        } else {
          console.log('connect to internet');
        }
      })
      .catch((error) => {
        this.setState({
          error: error,
        });
      });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { firstname } = this.state;
    const { classes } = this.props;
    const { user } = this.props.auth;
    return (
      <div>
        <Container maxWidth='lg'>
          <div
            style={{
              width: '100%',
              height: '939px',
            }}
          >
            {this.state.update ? <h4>Update successfully!</h4> : ''}
            <div>
              <form onSubmit={this.handleSubmit} className={classes.form}>
                <div>
                  <div>
                    {!this.props.auth ? (
                      ''
                    ) : (
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
                          disabled={this.state.disabled}
                          className={classes.avatar}
                        />
                        <div onClick={() => this.imageUploader.current.click()}>
                          <img
                            className={classes.avatar}
                            ref={this.uploadedImage}
                            alt='profile_image'
                            src={user && user.avatar}
                            disabled={this.state.disabled}
                          />
                        </div>
                      </div>
                    )}
                    <Button variant='contained' color='success' type='submit'>
                      Submit
                    </Button>
                    <Button
                      variant='contained'
                      color='success'
                      onClick={() => this.handleEdit()}
                      className={classes.buttonEdit}
                    >
                      <EditIcon
                        fontSize='small'
                        className={`${
                          this.state.disabled === true
                            ? classes.colorButtonEdit
                            : classes.colorButtonEditFalse
                        }`}
                      />
                    </Button>
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
});
export default withStyles(useStyles)(
  connect(mapStateToProps, { loadUser })(Profile),
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
