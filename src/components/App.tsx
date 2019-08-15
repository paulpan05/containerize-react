import React from 'react';
import RootRoute from '../routes/RootRoute';
import { Auth } from 'aws-amplify';
import { loginSuccess } from '../redux/actions/auth';
import { connect } from 'react-redux';
import { AppProps } from '../types/components';
import { loadingPage, loadingPageFinished } from '../redux/actions/pageload';
import PageRoutes from '../routes/PageRoutes';

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
      <PageRoutes />
    </React.Fragment>
  );
})

export default App;