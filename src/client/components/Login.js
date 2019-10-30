import React, { Component } from 'react';
import axios from 'axios';
import { emailRegex, formValidation } from '../../utils/validation';

class Login extends Component {
	state = {
	  email: null,
	  password: null,
	  formErrors: {
	    email: '',
	    password: ''
	  }
	};


	handleSubmit = (e) => {
	  const userData = this.state.email;
	  e.preventDefault();

	  axios.get('/api/user/login', {
	    method: 'GET',
	    body: JSON.stringify(userData),
	    headers: {
	      Accept: 'application/json',
	      'Content-Type': 'application/json'
	    },
	  }).then((response) => {
	    response.json().then((data) => {
	      console.log(`Successful${data}`);
	    });
	  });


	  if (formValidation(this.state)) {
	    console.log(`
					--SUBMITTING--
					Email: ${this.state.email}
				`);
	  } else {
	    console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
	  }
	};

	handleChange = (e) => {
	  e.preventDefault();
	  const { name, value } = e.target;
	  const formErrors = { ...this.state.formErrors };

	  switch (name) {
	    case 'email':
	      formErrors.email = emailRegex.test(value)
	        ? ''
	        : 'invalid email address';
	      break;
	    case 'password':
	      formErrors.password = value.length < 6 ? 'minimum 6 characaters required' : '';
	      break;
	    default:
	      break;
	  }
	  this.setState({ formErrors, [name]: value });
	};

	render() {
	  const { formErrors } = this.state;

	  return (
  <>
    <form onSubmit={this.handleSubmit} noValidate>

      <div className="email">
        <label htmlFor="email">Email</label>
        <input
          className={formErrors.email.length > 0 ? 'error' : null}
          placeholder="Email"
          type="email"
          name="email"
          noValidate
          onChange={this.handleChange}
        />
        {formErrors.email.length > 0 && (
          <span className="errorMessage">{formErrors.email}</span>
        )}
      </div>
      <div className="password">
        <label htmlFor="password">Password</label>
        <input
          className={formErrors.password.length > 0 ? 'error' : null}
          placeholder="Password"
          type="password"
          name="password"
          noValidate
          onChange={this.handleChange}
        />
        {formErrors.password.length > 0 && (
          <span className="errorMessage">{formErrors.password}</span>
        )}
      </div>
      <p className="forgot"><a href="#">Forgot Password?</a></p>
      <div className="createAccount">
        <button type="submit" className="button button-block">Log In</button>
      </div>
    </form>
  </>
	  );
	}
}

export default Login;
