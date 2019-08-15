import React from 'react';
import { mainPageStyles } from '../constants/styles-component';
import { RootState } from '../redux/types/root';
import { connect } from 'react-redux';
import { MainPageProps } from '../types/components';
import { Redirect, Route } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Dashboard from './Dashboard';
import SignedOut from './SignedOut';

const mapsStateToProps = (state: RootState) => {
  return {
    loggedIn: state.auth.loggedIn,
    signoutWarn: state.auth.signoutWarn
  }
}

const MainPage = connect(mapsStateToProps)((props: MainPageProps) => {
  const classes = mainPageStyles();
  return (
    <React.Fragment>
      {props.signoutWarn && (
        <SignedOut />
      )}
      {!props.loggedIn && !props.signoutWarn && (
        <Redirect to='/' />
      )}
      {props.loggedIn && !props.signoutWarn && (
        <div className={classes.mainDiv}>
          <AppBar position='static'>
            <Toolbar></Toolbar>
          </AppBar>
          <Route path={`${props.match.url}/dashboard`} component={Dashboard} />
        </div>
      )}
    </React.Fragment>
  );
})

export default MainPage;