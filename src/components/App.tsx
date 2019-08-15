import React from 'react';
import RootRoute from '../routes/RootRoute';
import { Auth } from 'aws-amplify';
import { setUsername, pageloadLoggedIn, signoutWarn, pageloadNotLoggedIn } from '../redux/actions/auth';
import { connect } from 'react-redux';
import { AppProps } from '../types/components';
import PageRoutes from '../routes/PageRoutes';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { RootState } from '../redux/types/root';

const mapStateToProps = (state: RootState) => {
  return {
    loggedIn: state.auth.loggedIn
  }
}

const App = connect(mapStateToProps)((props: AppProps) => {
  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user: CognitoUser) => {
        props.dispatch(setUsername(user.getUsername()));
        props.dispatch(pageloadLoggedIn());
      }).catch(() => {
        if (props.loggedIn) {
          props.dispatch(signoutWarn());
        } else {
          props.dispatch(pageloadNotLoggedIn());
        }
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