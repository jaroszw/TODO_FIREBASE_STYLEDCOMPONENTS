import React from 'react';
import Layout from './hoc/layout/Layout';
import { connect } from 'react-redux';

//Rout components
import Home from './containers/Home/Home';
import Todos from './containers/Todos/Todos';
import Login from './containers/Auth/Login/Login';
import SignUp from './containers/Auth/SingUp/SingUp';
import LogOut from './containers/Auth/Logout/Logout';
import VerifyEmail from './containers/Auth/VerifiedEmail/VerifiedEmail';

import { Route, Switch, Redirect } from 'react-router';

const App = ({ loggedIn, emailVerified }) => {
  let routes;
  if (loggedIn && !emailVerified) {
    routes = (
      <Switch>
        <Route exact path="/verify-email" component={VerifyEmail} />
        <Route exact path="/logout" component={LogOut} />
        <Redirect to="/verify-email" />
      </Switch>
    );
  } else if (loggedIn && emailVerified) {
    routes = (
      <Switch>
        <Route exact path="/" component={Todos} />
        <Route exact path="/logout" component={LogOut} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Redirect to="/login" />
      </Switch>
    );
  }
  return <Layout>{routes}</Layout>;
};

const mapStateToProps = ({ firebase }) => ({
  loggedIn: firebase.auth.uid,
  emailVerified: firebase.auth.emailVerified,
});

export default connect(mapStateToProps)(App);
