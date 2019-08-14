import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import SignupPage from '../components/SignupPage';
import ForgotPasswordPage from '../components/ForgotPasswordPage';

const AuthRoutes = withRouter((props) => {
  return (
    <Switch location={props.location}>
      <Route exact path='/login' component={LoginPage} />
      <Route exact path='/signup' component={SignupPage} />
      <Route exact path='/forgot-password' component={ForgotPasswordPage} />
    </Switch>
  );
});

export default AuthRoutes;