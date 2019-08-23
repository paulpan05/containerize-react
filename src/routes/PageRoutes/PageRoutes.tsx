import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import LoginPage from '../../components/LoginPage';
import SignupPage from '../../components/SignupPage';
import ForgotPasswordPage from '../../components/ForgotPasswordPage';
import MainPage from '../../components/MainPage';
import PageNotFound from '../../components/PageNotFound';

const PageRoutes = withRouter((props) => {
  return (
    <Switch location={props.location}>
      <Route exact path='/login' component={LoginPage} />
      <Route exact path='/signup' component={SignupPage} />
      <Route exact path='/forgot-password' component={ForgotPasswordPage} />
      <Route exact path='/main' component={PageNotFound} />
      <Route path='/main' component={MainPage} />
      <Route exact path='/' />
      <Route path='*' component={PageNotFound} />
    </Switch>
  );
});

export default PageRoutes;