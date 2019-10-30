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
  render() {
    return (
      <Router>
        <div className="wrapper">
          <div className="form-wrapper">
            <ul className="tab-group">
              {/* TODO: make active class conditional based on url */}
              <li className="tab active"><NavLink activeClassName="active" exact to="/signup">Sign Up</NavLink></li>
              <li className="tab"><NavLink activeClassName="active" exact to="/login">Log In</NavLink></li>
            </ul>

            <div className="tab-content">
              <Switch>
                <Route exact path="/">
                  <h1>Sign Up for Free</h1>
                  <Signup />
                </Route>
                <Route path="/signup">
                  <h1>Sign Up for Free</h1>
                  <Signup />
                </Route>
                <Route path="/login">
                  <h1>Welcome Back!</h1>
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
