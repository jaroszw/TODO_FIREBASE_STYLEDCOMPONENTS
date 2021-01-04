import React from 'react';
import Layout from './hoc/layout/Layout';

//Rout components
import Home from './containers/Home/Home';
import Todos from './containers/Todos/Todos';

import { Route, Switch, Redirect } from 'react-router';

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/todos" component={Todos} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
};

export default App;
