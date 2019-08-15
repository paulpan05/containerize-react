import React from 'react';
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { RootState } from '../redux/types/root';
import { RootRouteProps } from '../types/routes';

const mapStateToProps = (state: RootState) => {
  return {
    loggedIn: state.auth.loggedIn,
  }
}

const RootRoute = connect(mapStateToProps)((props: RootRouteProps) => {
  return (
    <Route exact path='/' render={() => (
        props.loggedIn ?
          (<Redirect to='/main/dashboard' />) :
          (<Redirect to='/login' />)
      )}
    />
  );
})

export default RootRoute;