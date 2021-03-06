import React from 'react';
import { RootState } from '../../redux/types';
import { connect } from 'react-redux';
import { ForgotPasswordPageProps } from './types';
import Grid from '@material-ui/core/Grid';
import { forgotPasswordPageStyles } from './constants';
import logo from '../../img/logo.png';
import { Redirect } from 'react-router';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { authActions } from '../../redux/actions';
import AlertSnackbar from '../AlertSnackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import MuiLink from '@material-ui/core/Link';

const mapStateToProps = (state: RootState) => {
  return {
    loggedIn: state.auth.loggedIn,
    forgotPasswordProcessing: state.auth.forgotPasswordProcessing,
    forgotPasswordFailed: state.auth.forgotPasswordFailed,
    forgotPasswordFailedReason: state.auth.forgotPasswordFailedReason,
    forgotPasswordConfirm: state.auth.forgotPasswordConfirm,
    forgotPasswordConfirmFailed: state.auth.forgotPasswordConfirmFailed,
    forgotPasswordConfirmFailedReason: state.auth.forgotPasswordConfirmFailedReason,
    forgotPasswordLoginRedirect: state.auth.forgotPasswordLoginRedirect,
    username: state.auth.username
  }
}

const ForgotPasswordPage = connect(mapStateToProps)((props: ForgotPasswordPageProps) => {
  const [username, setUsername] = React.useState();
  const [confirmCode, setConfirmCode] = React.useState();
  const [newPassword, setNewPassword] = React.useState();
  const classes = forgotPasswordPageStyles();
  return (
    <React.Fragment>
      {props.loggedIn && (
        <Redirect to='/' />
      )}
      {props.forgotPasswordLoginRedirect && (
        <Redirect to='/login' />
      )}
      {!props.loggedIn && !props.forgotPasswordLoginRedirect && (
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
          className={classes.pageGrid}
        >
          <Grid item>
            <img src={logo} alt='logo' className={classes.logo} />
          </Grid>
          {props.forgotPasswordConfirm && (
            <React.Fragment>
              <Grid item>
                <Typography
                  align='center'
                  variant='h5'
                  gutterBottom
                >
                  Please enter new password and confirmation code to reset.
                </Typography>
              </Grid>
              <Grid
                container
                item={true}
                className={classes.innerGrid}
              >
                {props.forgotPasswordConfirmFailed && (
                  <AlertSnackbar
                    variant='error'
                    onClose={() => {
                      props.dispatch(
                        authActions.resetForgotPasswordSubmitRequestFailure()
                      );
                    }}
                    className={classes.snackbarMargin}
                    message={props.forgotPasswordConfirmFailedReason}
                  />
                )}
                <TextField
                  label='Confirmation code'
                  type='text'
                  name='confirmcode'
                  margin='normal'
                  variant='outlined'
                  fullWidth
                  onChange={(event) => { setConfirmCode(event.target.value) }}
                  onKeyPress={(event) => {
                    if (event.key === 'Enter' && newPassword && confirmCode) {
                      event.preventDefault();
                      props.dispatch(authActions.forgotPasswordSubmit(props.username, confirmCode, newPassword));
                    }
                  }}
                />
                <TextField
                  label='New password'
                  type='password'
                  name='password'
                  autoComplete='current-password'
                  margin='normal'
                  variant='outlined'
                  onChange={(event) => { setNewPassword(event.target.value) }}
                  onKeyPress={(event) => {
                    if (event.key === 'Enter' && newPassword && confirmCode) {
                      event.preventDefault();
                      props.dispatch(authActions.forgotPasswordSubmit(props.username, confirmCode, newPassword));
                      setConfirmCode(undefined);
                      setNewPassword(undefined);
                    }
                  }}
                  fullWidth
                />
                <Grid
                  container
                  direction='row'
                  justify='center'
                  alignItems='center'
                  spacing={6}
                  className={classes.forgotPasswordGrid}
                >
                  <Grid item>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={(event) => {
                        event.preventDefault();
                        props.dispatch(authActions.forgotPasswordSubmit(props.username, confirmCode, newPassword));
                        setConfirmCode(undefined);
                        setNewPassword(undefined);
                      }}
                    >
                      Reset password
                    </Button>
                  </Grid>
                  <Grid item>
                    <MuiLink
                      component={Link}
                      to='/login'
                      variant='body1'
                      onClick={() => { props.dispatch(authActions.backToLogin()) }}
                    >
                      Back to login
                    </MuiLink>
                  </Grid>
                </Grid>
              </Grid>
            </React.Fragment>
          )}
          {props.forgotPasswordProcessing && !props.forgotPasswordConfirm && (
            <React.Fragment>
              <Grid item>
                <Typography align='center' variant='h4'>
                  Processing
                </Typography>
              </Grid>
              <Grid item>
                <CircularProgress size='10em' className={classes.loadProgress} />
              </Grid>
            </React.Fragment>
          )}
          {!props.forgotPasswordProcessing && !props.forgotPasswordConfirm && (
            <React.Fragment>
              <Grid item>
                <Typography
                  align='center'
                  variant='h5'
                  gutterBottom
                >
                  Enter your username to proceed.
                </Typography>
              </Grid>
              <Grid
                container
                item={true}
                className={classes.innerGrid}
              >
                {props.forgotPasswordFailed && (
                  <AlertSnackbar
                    variant='error'
                    onClose={() => {
                      props.dispatch(
                        authActions.resetForgotPasswordRequestFailure()
                      );
                    }}
                    className={classes.snackbarMargin}
                    message={props.forgotPasswordFailedReason}
                  />
                )}
                <TextField
                  label='Username'
                  type='text'
                  name='username'
                  autoComplete='username'
                  margin='normal'
                  variant='outlined'
                  fullWidth
                  onChange={(event) => { setUsername(event.target.value) }}
                  onKeyPress={(event) => {
                    if (event.key === 'Enter' && username) {
                      event.preventDefault();
                      props.dispatch(authActions.forgotPassword(username));
                      setUsername(undefined);
                    }
                  }}
                />
                <Grid
                  container
                  direction='row'
                  justify='center'
                  alignItems='center'
                  spacing={6}
                  className={classes.forgotPasswordGrid}
                >
                  <Grid item>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={(event) => {
                        event.preventDefault();
                        props.dispatch(authActions.forgotPassword(username));
                        setUsername(undefined);
                      }}
                    >
                      Proceed with request
                    </Button>
                  </Grid>
                  <Grid item>
                    <MuiLink
                      component={Link}
                      to='/login'
                      variant='body1'
                      onClick={() => { props.dispatch(authActions.backToLogin()) }}
                    >
                      Back to login
                    </MuiLink>
                  </Grid>
                </Grid>
              </Grid>
            </React.Fragment>
          )}
        </Grid>
      )}
    </React.Fragment>
  );
})

export default ForgotPasswordPage;