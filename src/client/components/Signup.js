import React, { Component } from 'react';
import axios from 'axios';
import { emailRegex, formValidation } from '../../utils/validation';

class Signup extends Component {
	state = {
	  firstName: null,
	  lastName: null,
	  email: null,
	  password: null,
	  formErrors: {
	    firstName: '',
	    lastName: '',
	    email: '',
	    password: ''
	  }
	};

  handleSubmit = (e) => {
    const userData = this.state;
    e.preventDefault();
    axios.post('/api/user/register', {
      method: 'POST',
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
					First Name: ${this.state.firstName}
					Last Name: ${this.state.lastName}
					Email: ${this.state.email}
					Password: ${this.state.password}
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
      <div className="firstName">
        <label htmlFor="firstName">First Name</label>
        <input
          className={formErrors.firstName.length > 0 ? 'error' : null}
          placeholder="First Name"
          type="text"
          name="firstName"
          noValidate
          onChange={this.handleChange}
        />
        {formErrors.firstName.length > 0 && (
        <span className="errorMessage">{formErrors.firstName}</span>
        )}
      </div>
      <div className="lastName">
        <label htmlFor="lastName">Last Name</label>
        <input
          className={formErrors.lastName.length > 0 ? 'error' : null}
          placeholder="Last Name"
          type="text"
          name="lastName"
          noValidate
          onChange={this.handleChange}
        />
        {formErrors.lastName.length > 0 && (
        <span className="errorMessage">{formErrors.lastName}</span>
        )}
      </div>
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
      <div className="createAccount">
        <button type="submit" className="button button-block">Get Started</button>
      </div>
    </form>
  </>
	  );
	}
}

export default Signup;
