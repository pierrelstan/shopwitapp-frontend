import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../redux/actions/auth';
import { setAlert } from '../redux/actions/alert';

class SignUp extends Component {
  state = {
    firstname: 'Stanley',
    lastname: 'Pierre-Louis',
    email: 'stanley01@gmail.com',
    password: '123456',
    confirmPassword: '123456',
  };
  //   fix error binding
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    const {
      email,
      password,
      confirmPassword,
      firstname,
      lastname,
    } = this.state;
    console.log(this.state);
    e.preventDefault();
    if (password !== confirmPassword) {
      this.props.setAlert('Password do not match', 'danger');
    } else {
      this.props.register(
        {
          email,
          password,
          confirmPassword,
          firstname,
          lastname,
        },
        this.props,
      );
    }
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/' />;
    }
    const {
      email,
      password,
      confirmPassword,
      firstname,
      lastname,
    } = this.state;
    return (
      <div className='container'>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Fisrtname:</label>
            <input
              type='text'
              name='firstname'
              ref='firstname'
              value={firstname}
              onChange={this.handleChange}
              placeholder=' Enter your firstname'
            />
          </div>
          <div>
            <label>Lastname:</label>
            <input
              type='text'
              name='lastname'
              ref='lastname'
              value={lastname}
              onChange={this.handleChange}
              placeholder=' Enter your lastname'
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type='text'
              name='email'
              ref='name'
              value={email}
              onChange={this.handleChange}
              placeholder=' Enter the email'
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type='password'
              name='password'
              ref='password'
              value={password}
              onChange={this.handleChange}
              placeholder='Enter the password'
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              type='password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={this.handleChange}
              placeholder='Enter the password'
            />
          </div>
          <input type='submit' value='Submit' />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  register: state.register,
  isAuthenticated: state.auth.isAuthenticated,
  active: state.auth.user.active,
});

export default withRouter(
  connect(mapStateToProps, { register, setAlert })(SignUp),
);
