import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { loginPageStyles } from '../constants/styles-component';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Link, Redirect } from 'react-router-dom';
import logo from '../img/logo.png';
import { LoginPageProps } from '../types/components';
import {
  login,
  loginFailureReset,
  loginPasswordReset,
  passwordResetFailureReset,
  backToLogin,
  resetSignedUp,
  resendSignupVerification,
  redirectToSignup,
  signupRequestComplete,
  resetForgotPasswordLoginRedirect
} from '../redux/actions/auth';
import { RootState } from '../types/redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import AlertSnackbar from './AlertSnackbar';

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
  React.useEffect(() => {
    if (props.loginFailed) {
      setId(undefined);
      setPassword(undefined);
    } else if (props.loginNewPassword) {
      setPassword(undefined);
    }
  }, [props.loginFailed, props.loginNewPassword]);
  const classes = loginPageStyles();
  return (
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
      {props.redirectToSignup && (
        <Redirect to='/signup' />
      )}
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
                  props.dispatch(backToLogin());
                  props.dispatch(signupRequestComplete(username, 'Email'));
                  props.dispatch(resendSignupVerification(username));
                  props.dispatch(redirectToSignup());
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
                    props.dispatch(backToLogin());
                    props.dispatch(signupRequestComplete(username, 'Email'));
                    props.dispatch(resendSignupVerification(username));
                    props.dispatch(redirectToSignup());
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
                    props.dispatch(backToLogin());
                  }}
                >
                  Back to login
                </MuiLink>
              </Grid>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
      {props.loggedIn && (
        <Redirect to='/console' />
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
                    passwordResetFailureReset()
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
                  props.dispatch(loginPasswordReset(props.user, password));
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
                    props.dispatch(loginPasswordReset(props.user, password));
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
                    props.dispatch(backToLogin());
                  }}
                >
                  Back to login
                </MuiLink>
              </Grid>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
      {props.loggingIn && !props.loginNewPassword && (
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
                    resetForgotPasswordLoginRedirect()
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
                    resetSignedUp()
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
                    loginFailureReset()
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
                  props.dispatch(login(id, password));
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
                  props.dispatch(login(id, password));
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
                    props.dispatch(login(id, password));
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
                  onClick={() => {props.dispatch(resetForgotPasswordLoginRedirect())}}
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
                onClick={() => { props.dispatch(resetSignedUp()) }}
              >
                Sign up
              </MuiLink>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </Grid>
  );
})

export default LoginPage;