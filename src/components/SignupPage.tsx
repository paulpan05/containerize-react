import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import { Link, Redirect } from 'react-router-dom';
import { signupPageStyles } from '../constants/styles-component';
import logo from '../img/logo.png';
import { RootState } from '../types/redux';
import { connect } from 'react-redux';
import { SignupPageProps } from '../types/components';
import {
  signup,
  signupFailureReset,
  signupVerification,
  resendSignupSuccessReset,
  resendSignupFailureReset,
  backToLogin,
  resendSignupVerification,
  resetRedirectToSignup
} from '../redux/actions/auth';
import CircularProgress from '@material-ui/core/CircularProgress';
import AlertSnackbar from './AlertSnackbar';

const mapStateToProps = (state: RootState) => {
  return {
    signingUp: state.auth.signingUp,
    signupFailed: state.auth.signupFailed,
    signupFailedReason: state.auth.signupFailedReason,
    signupConfirm: state.auth.signupConfirm,
    signupConfirmMedium: state.auth.signupConfirmMedium,
    signupConfirmUsername: state.auth.signupConfirmUsername,
    resendingSignup: state.auth.resendingSignup,
    resendSuccess: state.auth.resendSuccess,
    resendFailed: state.auth.resendFailed,
    verifyingSignup: state.auth.verifyingSignup,
    verifyFailed: state.auth.verifyFailed,
    signedUp: state.auth.signedUp
  }
}

const SignupPage = connect(mapStateToProps)((props: SignupPageProps) => {
  const [username, setUsername] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [confirmCode, setConfirmCode] = React.useState();
  React.useEffect(() => {
    props.dispatch(resetRedirectToSignup());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    if (props.signupFailed) {
      setUsername(undefined);
      setEmail(undefined);
      setPassword(undefined);
    } else if (props.verifyFailed) {
      setConfirmCode(undefined);
    }
  }, [props.signupFailed, props.verifyFailed]);
  const classes = signupPageStyles();
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
      {props.signedUp && (
        <Redirect to='/login' />
      )}
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
                    resendSignupSuccessReset()
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
                    resendSignupFailureReset()
                  );
                }}
                className={classes.snackbarMargin}
                message='Code resend failed'
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
                  props.dispatch(signupVerification(props.signupConfirmUsername, confirmCode));
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
                    props.dispatch(resendSignupVerification(props.signupConfirmUsername));
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
                    props.dispatch(signupVerification(props.signupConfirmUsername, confirmCode));
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
                onClick={() => {props.dispatch(backToLogin())}}
              >
                Sign up
              </MuiLink>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
      {(props.signingUp || props.resendingSignup || props.verifyingSignup) && (
        <React.Fragment>
          <Grid item>
            <Typography align='center' variant='h4'>
              {() => {
                if (props.signingUp) {
                  return 'Signing up';
                } else if (props.resendingSignup) {
                  return 'Resending Code';
                } else {
                  return 'Verifying Signup';
                }
              }}
            </Typography>
          </Grid>
          <Grid item>
            <CircularProgress size='10em' className={classes.loadProgress} />
          </Grid>
        </React.Fragment>
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
                    signupFailureReset()
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
                  props.dispatch(signup(username, email, password));
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
                  props.dispatch(signup(username, email, password));
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
                  props.dispatch(signup(username, email, password));
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
                >
                  Create new user
                </Button>
              </Grid>
              <Grid item>
                <MuiLink component={Link} to='/login' variant='body1'>
                  Back to log in
                </MuiLink>
              </Grid>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </Grid>
  );
})

export default SignupPage;