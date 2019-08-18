import React from 'react';
import RootRoute from '../routes/RootRoute';
import { performWithAuthenticatedUser } from '../redux/actions/auth';
import { connect } from 'react-redux';
import { AppProps } from '../types/components';
import PageRoutes from '../routes/PageRoutes';
import { RootState } from '../redux/types/root';

const mapStateToProps = (state: RootState) => {
  return {
    loggedIn: state.auth.loggedIn
  }
}

const App = connect(mapStateToProps)((props: AppProps) => {
  React.useEffect(() => {
    props.dispatch(performWithAuthenticatedUser(props.loggedIn));
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