import React from 'react';
import AuthRoutes from '../routes/AuthRoutes';
import RootRoute from '../routes/RootRoute';
import { Auth } from 'aws-amplify';
import { loginSuccess } from '../redux/actions/auth';
import { connect } from 'react-redux';
import { AppProps } from '../types/components';

const App = connect()((props: AppProps) => {
  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        props.dispatch(loginSuccess(user));
      }).catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <React.Fragment>
      <RootRoute />
      <AuthRoutes />
    </React.Fragment>
  );
})

export default App;