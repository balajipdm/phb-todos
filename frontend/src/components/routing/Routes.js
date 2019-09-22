import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Todos from '../todos/Todos';
import NewTodo from '../todos/NewTodo';
import UpdateTodo from '../todos/UpdateTodo';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/todos' component={Todos} />
        <PrivateRoute path="/todos/update/:id" component={UpdateTodo} />
        <PrivateRoute exact path='/todos/new' component={NewTodo} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
