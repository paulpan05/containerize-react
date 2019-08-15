import React from 'react';
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { RootState } from '../redux/types/root';
import { RootRouteProps } from '../types/routes';

const mapStateToProps = (state: RootState) => {
  return {
    loggedIn: state.auth.loggedIn,
    pageLoading: state.pageload.pageLoading,
    previousPageRoute: state.pageload.previousPageRoute
  }
}

const RootRoute = connect(mapStateToProps)((props: RootRouteProps) => {
  return (
    <Route exact path='/' render={() => (
      !props.pageLoading ? (
        props.loggedIn ?
          (<Redirect to={props.previousPageRoute} />) :
          (<Redirect to='/login' />)
      ) : (<React.Fragment />))}
    />
  );
})

export default RootRoute;