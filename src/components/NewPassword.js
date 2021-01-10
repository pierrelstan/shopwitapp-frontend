import React, { Component } from 'react';
import { connect } from 'react-redux';

import { newPassWord } from '../redux/actions/auth';
import { setAlert } from '../redux/actions/alert';
class NewPassword extends Component {
  state = {
    password: '',
    confirmPassword: '',
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(e);
  };
  handleSubmit = async (e) => {
    e.preventDefault();

    let token = this.props.match.params.id;
    this.props.newPassWord(token, this.state, this.props);
    // this.props.setAlert('Password change successfully!', 'success');
  };

  render() {
    console.log(this.props);
    const { password, confirmPassword } = this.state;
    return (
      <div className='container'>
        {/* <Alert /> */}
        <p>
          Update your password Your password must contain the following: 1-At
          least 8 characters (a strong password has at least 14 characters) 2-
          At least 1 letter and at least 1 number or symb
        </p>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>New Password:</label>
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
            <label>Confirm New Password:</label>
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
  newPassWord: state.auth,
});
export default connect(mapStateToProps, { newPassWord, setAlert })(NewPassword);
