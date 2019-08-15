import React from 'react';
import AuthRoutes from '../routes/AuthRoutes';
import RootRoute from '../routes/RootRoute';
import { Auth } from 'aws-amplify';
import { loginSuccess } from '../redux/actions/auth';
import { connect } from 'react-redux';
import { AppProps } from '../types/components';
import { loadingPage, loadingPageFinished } from '../redux/actions/pageload';
import { Route } from 'react-router-dom';
import MainPage from './MainPage';
import Dashboard from './Dashboard';

const App = connect()((props: AppProps) => {
  React.useEffect(() => {
    props.dispatch(loadingPage());
    Auth.currentAuthenticatedUser()
      .then((user) => {
        props.dispatch(loginSuccess(user));
        props.dispatch(loadingPageFinished());
      }).catch(() => {
        props.dispatch(loadingPageFinished());
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <React.Fragment>
      <RootRoute />
      <AuthRoutes />
      <Route path='/main'
        render={() => (<MainPage innerComponent={<Dashboard/>} />)}
      />
    </React.Fragment>
  );
})

export default App;