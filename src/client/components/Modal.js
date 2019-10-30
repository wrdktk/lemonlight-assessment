import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';


class Modal extends Component {
  state = {
    isSignupActive: true,
    isLoginActive: false
  }

  isSignupActive = () => {
    this.setState({ isSignupActive: true, isLoginActive: false });
  }

  isLoginActive = () => {
    this.setState({ isSignupActive: false, isLoginActive: true });
  }

  render() {
    return (
      <Router>
        <div className="wrapper">
          <div className="form-wrapper">
            <ul className="tab-group">
              <li className={this.state.isSignupActive ? 'tab active' : 'tab'}>
                <NavLink exact to="/signup" onClick={this.isSignupActive}>Sign Up</NavLink>
              </li>
              <li className={this.state.isLoginActive ? 'tab active' : 'tab'}>
                <NavLink exact to="/login" onClick={this.isLoginActive}>Log In</NavLink>
              </li>
            </ul>

            <div className="tab-content">
              <h1>{this.state.isSignupActive ? 'Sign Up for Free' : 'Welcome Back!'}</h1>
              <Switch>
                <Route exact path="/">
                  <Signup />
                </Route>
                <Route path="/signup">
                  <Signup />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default Modal;
