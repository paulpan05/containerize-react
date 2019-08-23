import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import { Link, Redirect } from 'react-router-dom';
import { signupPageStyles } from './constants';
import logo from '../../img/logo.png';
import { RootState } from '../../redux/types';
import { connect } from 'react-redux';
import { SignupPageProps } from './types';
import { authActions } from '../../redux/actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import AlertSnackbar from '../AlertSnackbar';

const mapStateToProps = (state: RootState) => {
  return {
    loggedIn: state.auth.loggedIn,
    signingUp: state.auth.signingUp,
    signupFailed: state.auth.signupFailed,
    signupFailedReason: state.auth.signupFailedReason,
    signupConfirm: state.auth.signupConfirm,
    signupConfirmMedium: state.auth.signupConfirmMedium,
    username: state.auth.username,
    resendingSignup: state.auth.resendingSignup,
    resendSuccess: state.auth.resendSuccess,
    resendFailed: state.auth.resendFailed,
    resendFailedReason: state.auth.resendFailedReason,
    verifyingSignup: state.auth.verifyingSignup,
    verifyFailed: state.auth.verifyFailed,
    verifyFailedReason: state.auth.verifyFailedReason,
    signedUp: state.auth.signedUp
  }
}

const SignupPage = connect(mapStateToProps)((props: SignupPageProps) => {
  const [username, setUsername] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [confirmCode, setConfirmCode] = React.useState();
  React.useEffect(() => {
    props.dispatch(authActions.resetRedirectToSignup());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const classes = signupPageStyles();
  return (
    <React.Fragment>
      {props.loggedIn && (
        <Redirect to='/' />
      )}
      {props.signedUp && (
        <Redirect to='/login' />
      )}
      {!props.loggedIn && !props.signedUp && (

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
          {props.signupConfirm && !props.resendingSignup && !props.verifyingSignup && (
            <React.Fragment>
              <Grid item>
                <Typography
                  align='center'
                  variant='h5'
                  gutterBottom
                >
                  Confirmation code has been send via {props.signupConfirmMedium}. Please
                  enter code to confirm sign-up.
                </Typography>
              </Grid>
              <Grid
                container
                item={true}
                className={classes.innerGrid}
              >
                {props.resendSuccess && (
                  <AlertSnackbar
                    variant='success'
                    onClose={() => {
                      props.dispatch(
                        authActions.resendSignupSuccessReset()
                      );
                    }}
                    className={classes.snackbarMargin}
                    message='Code has been resent'
                  />
                )}
                {props.resendFailed && (
                  <AlertSnackbar
                    variant='error'
                    onClose={() => {
                      props.dispatch(
                        authActions.resendSignupFailureReset()
                      );
                    }}
                    className={classes.snackbarMargin}
                    message={props.resendFailedReason}
                  />
                )}
                {props.verifyFailed && (
                  <AlertSnackbar
                    variant='error'
                    onClose={() => {
                      props.dispatch(
                        authActions.signupVerificationFailureReset()
                      );
                    }}
                    className={classes.snackbarMargin}
                    message={props.verifyFailedReason}
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
                    if (event.key === 'Enter' && confirmCode) {
                      event.preventDefault();
                      props.dispatch(authActions.signupVerification(props.username, confirmCode));
                      setConfirmCode(undefined);
                    }
                  }}
                />
                <Grid
                  container
                  direction='row'
                  justify='center'
                  alignItems='center'
                  spacing={6}
                  className={classes.confirmGrid}
                >
                  <Grid item>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={(event) => {
                        event.preventDefault();
                        props.dispatch(authActions.resendSignupVerification(props.username));
                      }}
                    >
                      Resend verification code
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={(event) => {
                        event.preventDefault();
                        props.dispatch(authActions.signupVerification(props.username, confirmCode));
                        setConfirmCode(undefined);
                      }}
                    >
                      Verify signup
                    </Button>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction='row'
                  justify='center'
                  className={classes.confirmGoBackGrid}
                >
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
            </React.Fragment>
          )}
          {props.signingUp && (
            <Grid item>
              <Typography align='center' variant='h4'>
                Signing up
              </Typography>
            </Grid>
          )}
          {props.resendingSignup && (
            <Grid item>
              <Typography align='center' variant='h4'>
                Resending code
              </Typography>
            </Grid>
          )}
          {props.verifyingSignup && (
            <Grid item>
              <Typography align='center' variant='h4'>
                Verifying signup
              </Typography>
            </Grid>
          )}
          {(props.signingUp || props.resendingSignup || props.verifyingSignup) && (
            <Grid item>
              <CircularProgress size='10em' className={classes.loadProgress} />
            </Grid>
          )}
          {!props.signingUp && !props.signupConfirm && (
            <React.Fragment>
              <Grid item>
                <Typography
                  align='center'
                  variant='h5'
                  gutterBottom
                >
                  Create a new account
                </Typography>
              </Grid>
              <Grid
                container
                item={true}
                className={classes.innerGrid}
              >
                {props.signupFailed && (
                  <AlertSnackbar
                    variant='error'
                    onClose={() => {
                      props.dispatch(
                        authActions.signupFailureReset()
                      );
                    }}
                    className={classes.snackbarMargin}
                    message={props.signupFailedReason}
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
                    if (event.key === 'Enter' && username && email && password) {
                      event.preventDefault();
                      props.dispatch(authActions.signup(username, email, password));
                      setUsername(undefined);
                      setEmail(undefined);
                      setPassword(undefined);
                    }
                  }}
                />
                <TextField
                  label='Email'
                  type='email'
                  name='email'
                  autoComplete='email'
                  margin='normal'
                  variant='outlined'
                  fullWidth
                  onChange={(event) => { setEmail(event.target.value) }}
                  onKeyPress={(event) => {
                    if (event.key === 'Enter' && username && email && password) {
                      event.preventDefault();
                      props.dispatch(authActions.signup(username, email, password));
                      setUsername(undefined);
                      setEmail(undefined);
                      setPassword(undefined);
                    }
                  }}
                />
                <TextField
                  label='Password'
                  type='password'
                  name='password'
                  autoComplete='current-password'
                  margin='normal'
                  variant='outlined'
                  fullWidth
                  onChange={(event) => { setPassword(event.target.value) }}
                  onKeyPress={(event) => {
                    if (event.key === 'Enter' && username && email && password) {
                      event.preventDefault();
                      props.dispatch(authActions.signup(username, email, password));
                      setUsername(undefined);
                      setEmail(undefined);
                      setPassword(undefined);
                    }
                  }}
                />
                <Grid
                  container
                  direction='row'
                  justify='center'
                  alignItems='center'
                  spacing={6}
                  className={classes.createUserGrid}
                >
                  <Grid item>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={(event) => {
                        event.preventDefault();
                        props.dispatch(authActions.signup(username, email, password));
                        setUsername(undefined);
                        setEmail(undefined);
                        setPassword(undefined);
                      }}
                    >
                      Create new user
                    </Button>
                  </Grid>
                  <Grid item>
                    <MuiLink
                      component={Link}
                      to='/login'
                      variant='body1'
                      onClick={() => {
                        props.dispatch(authActions.backToLogin());
                      }}
                    >
                      Back to log in
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

export default SignupPage;