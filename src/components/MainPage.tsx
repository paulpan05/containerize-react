import React from 'react';
import { mainPageStyles } from '../constants/styles-component';
import { RootState } from '../redux/types/root';
import { connect } from 'react-redux';
import { MainPageProps } from '../types/components';
import { Redirect } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const mapsStateToProps = (state: RootState) => {
  return {
    loggedIn: state.auth.loggedIn
  }
}

const MainPage = connect(mapsStateToProps)((props: MainPageProps) => {
  const classes = mainPageStyles();
  return (
    <React.Fragment>
      {!props.loggedIn && (
        <Redirect to='/' />
      )}
      {props.loggedIn && (
        <div className={classes.mainDiv}>
          <AppBar position='static'>
            <Toolbar></Toolbar>
          </AppBar>
          {props.innerComponent}
        </div>
      )}
    </React.Fragment>
  );
})

export default MainPage;