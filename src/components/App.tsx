import React from 'react';
import RootRoute from '../routes/RootRoute';
import { Auth } from 'aws-amplify';
import { loginSuccess, setUsername } from '../redux/actions/auth';
import { connect } from 'react-redux';
import { AppProps } from '../types/components';
import PageRoutes from '../routes/PageRoutes';
import { CognitoUser } from 'amazon-cognito-identity-js';

const App = connect()((props: AppProps) => {
  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user: CognitoUser) => {
        props.dispatch(setUsername(user.getUsername()));
        props.dispatch(loginSuccess(user));
      }).catch();
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