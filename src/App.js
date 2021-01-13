import React from "react";
import Layout from "./hoc/layout/Layout";
import { connect } from "react-redux";

//Rout components
import Home from "./containers/Home/Home";
import Todos from "./containers/Todos/Todos";
import Login from "./containers/Auth/Login/Login";
import SignUp from "./containers/Auth/SingUp/SingUp";
import LogOut from "./containers/Auth/Logout/Logout";

import { Route, Switch, Redirect } from "react-router";

const App = ({ loggedIn }) => {
  console.log(loggedIn);
  let routes;

  if (loggedIn) {
    routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/todos" component={Todos} />
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
        <Redirect to="/" />
      </Switch>
    );
  }
  return <Layout>{routes}</Layout>;
};

const mapStateToProps = ({ firebase }) => ({
  loggedIn: firebase.auth.uid ? true : null,
});

export default connect(mapStateToProps)(App);
