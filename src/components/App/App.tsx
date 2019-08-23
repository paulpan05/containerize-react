import React from 'react';
import RootRoute from '../../routes/RootRoute';
import { authActions } from '../../redux/actions';
import { connect } from 'react-redux';
import { AppProps } from './types';
import PageRoutes from '../../routes/PageRoutes';
import { RootState } from '../../redux/types';

const mapStateToProps = (state: RootState) => {
  return {
    loggedIn: state.auth.loggedIn
  }
}

const App = connect(mapStateToProps)((props: AppProps) => {
  React.useEffect(() => {
    props.dispatch(authActions.performWithAuthenticatedUser(props.loggedIn));
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