import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { loginPageStyles } from './constants';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Link, Redirect } from 'react-router-dom';
import logo from '../../img/logo.png';
import { LoginPageProps } from './types';
import { authActions } from '../../redux/actions';
import { RootState } from '../../redux/types';
import CircularProgress from '@material-ui/core/CircularProgress';
import AlertSnackbar from '../AlertSnackbar';

const mapStateToProps = (state: RootState) => {
  return {
    loggingIn: state.auth.loggingIn,
    loginNewPassword: state.auth.loginNewPassword,
    loggedIn: state.auth.loggedIn,
    loginFailed: state.auth.loginFailed,
    loginFailedReason: state.auth.loginFailedReason,
    passwordResetFailed: state.auth.passwordResetFailed,
    passwordResetFailedReason: state.auth.passwordResetFailedReason,
    user: state.auth.user,
    signedUp: state.auth.signedUp,
    getUsernameToConfirm: state.auth.getUsernameToConfirm,
    redirectToSignup: state.auth.redirectToSignup,
    forgotPasswordLoginRedirect: state.auth.forgotPasswordLoginRedirect
  }
}

const LoginPage = connect(mapStateToProps)((props: LoginPageProps) => {
  const [id, setId] = React.useState();
  const [password, setPassword] = React.useState();
  const [username, setUsername] = React.useState();
  const classes = loginPageStyles();
  return (
    <React.Fragment>
      {props.loggedIn && (
        <Redirect to='/' />
      )}
      {props.redirectToSignup && (
        <Redirect to='/signup' />
      )}
      {!props.loggedIn && !props.redirectToSignup && (
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
          {props.getUsernameToConfirm && (
            <React.Fragment>
              <Grid item>
                <Typography align='center' variant='h5' gutterBottom>
                  Please enter username for further account confirmation.
                </Typography>
              </Grid>
              <Grid
                container
                item={true}
                className={classes.innerGrid}
              >
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
                      props.dispatch(authActions.backToLogin());
                      props.dispatch(authActions.signupRequestComplete(username, 'Email'));
                      props.dispatch(authActions.resendSignupVerification(username));
                      props.dispatch(authActions.redirectToSignup());
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
                  className={classes.loginGrid}
                >
                  <Grid item>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={(event) => {
                        event.preventDefault();
                        props.dispatch(authActions.backToLogin());
                        props.dispatch(authActions.signupRequestComplete(username, 'Email'));
                        props.dispatch(authActions.resendSignupVerification(username));
                        props.dispatch(authActions.redirectToSignup());
                        setUsername(undefined);
                      }}
                    >
                      Go confirm account
                    </Button>
                  </Grid>
                  <Grid item>
                    <MuiLink
                      variant='body1'
                      onClick={(event: React.MouseEvent) => {
                        event.preventDefault();
                        props.dispatch(authActions.backToLogin());
                      }}
                    >
                      Back to login
                    </MuiLink>
                  </Grid>
                </Grid>
              </Grid>
            </React.Fragment>
          )}
          {props.loggingIn && props.loginNewPassword && (
            <React.Fragment>
              <Grid item>
                <Typography align='center' variant='h5' gutterBottom>
                  Please enter new password before signing in.
                </Typography>
              </Grid>
              <Grid
                container
                item={true}
                className={classes.innerGrid}
              >
                {props.passwordResetFailed && (
                  <AlertSnackbar
                    variant='error'
                    onClose={() => {
                      props.dispatch(
                        authActions.passwordResetFailureReset()
                      );
                    }}
                    className={classes.snackbarMargin}
                    message={props.passwordResetFailedReason}
                  />
                )}
                <TextField
                  label='Password'
                  type='password'
                  name='password'
                  autoComplete='current-password'
                  margin='normal'
                  variant='outlined'
                  onChange={(event) => { setPassword(event.target.value) }}
                  onKeyPress={(event) => {
                    if (event.key === 'Enter' && password) {
                      event.preventDefault();
                      props.dispatch(authActions.loginPasswordReset(props.user, password));
                      setPassword(undefined);
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
                  className={classes.loginGrid}
                >
                  <Grid item>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={(event) => {
                        event.preventDefault();
                        props.dispatch(authActions.loginPasswordReset(props.user, password));
                        setPassword(undefined);
                      }}
                    >
                      Change Password
                    </Button>
                  </Grid>
                  <Grid item>
                    <MuiLink
                      variant='body1'
                      onClick={(event: React.MouseEvent) => {
                        event.preventDefault();
                        props.dispatch(authActions.backToLogin());
                      }}
                    >
                      Back to login
                    </MuiLink>
                  </Grid>
                </Grid>
              </Grid>
            </React.Fragment>
          )}
          {props.loggingIn && !props.loginNewPassword && !props.getUsernameToConfirm && (
            <React.Fragment>
              <Grid item>
                <Typography align='center' variant='h4'>
                  Signing in
                </Typography>
              </Grid>
              <Grid item>
                <CircularProgress size='10em' className={classes.loadProgress} />
              </Grid>
            </React.Fragment>
          )}
          {!props.loggingIn && !props.loggedIn && (
            <React.Fragment>
              <Grid item>
                <Typography align='center' variant='h6' gutterBottom>
                  A flexible note taking app with custom integrations.
                </Typography>
              </Grid>
              <Grid
                container
                item={true}
                className={classes.innerGrid}
              >
                {props.forgotPasswordLoginRedirect && (
                  <AlertSnackbar
                    variant='success'
                    onClose={() => {
                      props.dispatch(
                        authActions.resetForgotPasswordLoginRedirect()
                      );
                    }}
                    className={classes.snackbarMargin}
                    message='Password successfully reset via forgot password'
                  />
                )}
                {props.signedUp && (
                  <AlertSnackbar
                    variant='success'
                    onClose={() => {
                      props.dispatch(
                        authActions.resetSignedUp()
                      );
                    }}
                    className={classes.snackbarMargin}
                    message='Signup success'
                  />
                )}
                {props.loginFailed && (
                  <AlertSnackbar
                    variant='error'
                    onClose={() => {
                      props.dispatch(
                        authActions.loginFailureReset()
                      );
                    }}
                    className={classes.snackbarMargin}
                    message={props.loginFailedReason}
                  />
                )}
                <TextField
                  label='Email or username'
                  type='text'
                  name='session[username_or_email]'
                  autoComplete='on'
                  margin='normal'
                  variant='outlined'
                  onChange={(event) => { setId(event.target.value) }}
                  onKeyPress={(event) => {
                    if (event.key === 'Enter' && id && password) {
                      event.preventDefault();
                      props.dispatch(authActions.login(id, password));
                      setId(undefined);
                      setPassword(undefined);
                    }
                  }}
                  fullWidth
                />
                <TextField
                  label='Password'
                  type='password'
                  name='password'
                  autoComplete='current-password'
                  margin='normal'
                  variant='outlined'
                  onChange={(event) => { setPassword(event.target.value) }}
                  onKeyPress={(event) => {
                    if (event.key === 'Enter' && id && password) {
                      event.preventDefault();
                      props.dispatch(authActions.login(id, password));
                      setId(undefined);
                      setPassword(undefined);
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
                  className={classes.loginGrid}
                >
                  <Grid item>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={(event) => {
                        event.preventDefault();
                        props.dispatch(authActions.login(id, password));
                        setId(undefined);
                        setPassword(undefined);
                      }}
                    >
                      Log in
                    </Button>
                  </Grid>
                  <Grid item>
                    <MuiLink
                      component={Link}
                      to='/forgot-password'
                      variant='body1'
                      onClick={() => { props.dispatch(authActions.resetForgotPasswordLoginRedirect()) }}
                    >
                      Forgot password?
                    </MuiLink>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction='row'
                  justify='center'
                  className={classes.signupGrid}
                >
                  <Typography variant='body1'>
                    New to the app?&nbsp;
                  </Typography>
                  <MuiLink
                    component={Link}
                    to='/signup'
                    variant='body1'
                    onClick={() => { props.dispatch(authActions.resetSignedUp()) }}
                  >
                    Sign up
                  </MuiLink>
                </Grid>
              </Grid>
            </React.Fragment>
          )}
        </Grid>
      )}
    </React.Fragment>
  );
})

export default LoginPage;