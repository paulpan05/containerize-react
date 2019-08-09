import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import SignupPage from '../components/SignupPage';

const AuthRoutes = withRouter((props) => {
  return (
    <Switch location={props.location}>
      <Route exact path='/login' component={LoginPage} />
      <Route exact path='/signup' component={SignupPage} />
    </Switch>
  );
});

export default AuthRoutes;