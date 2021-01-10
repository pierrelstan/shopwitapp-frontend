import React, { Component } from 'react';
import axios from 'axios';

export class ResetPassword extends Component {
  state = {
    email: '',
    title: '',
  };
  handleChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state);
    try {
      let data = await axios.post(
        `http://localhost:4000/auth/resetpassword`,
        this.state,
      );
      console.log(data);

      if (data)
        this.setState({
          title: data.data.email,
          email: '',
        });
    } catch (error) {
      this.setState({
        title: error.response.data.errors.msg,
      });
    }
  };
  render() {
    return (
      <div className='container'>
        <form onSubmit={this.handleSubmit}>
          <h1>{this.state.title}</h1>
          <div>
            <label>Enter your email:</label>
            <input
              type='text'
              name='email'
              value={this.state.email}
              onChange={this.handleChange}
              placeholder=' Enter your email'
            />
          </div>
          <input type='submit' value='Submit' />
        </form>
      </div>
    );
  }
}

export default ResetPassword;
