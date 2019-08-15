import React from 'react';
import RootRoute from '../routes/RootRoute';
import { Auth } from 'aws-amplify';
import { loginSuccess, setUsername } from '../redux/actions/auth';
import { connect } from 'react-redux';
import { AppProps } from '../types/components';
import { loadingPage, loadingPageFinished } from '../redux/actions/pageload';
import PageRoutes from '../routes/PageRoutes';
import { CognitoUser } from 'amazon-cognito-identity-js';

const App = connect()((props: AppProps) => {
  React.useEffect(() => {
    props.dispatch(loadingPage());
    Auth.currentAuthenticatedUser()
      .then((user: CognitoUser) => {
        props.dispatch(setUsername(user.getUsername()));
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
      <PageRoutes />
    </React.Fragment>
  );
})

export default App;