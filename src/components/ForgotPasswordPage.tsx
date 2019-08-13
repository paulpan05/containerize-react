import React from 'react';
import { RootState } from '../types/redux';
import { connect } from 'react-redux';
import { ForgotPasswordPageProps } from '../types/components';
import Grid from '@material-ui/core/Grid';
import { forgotPasswordPageStyles } from '../constants/styles-component';
import logo from '../img/logo.png';
import { Redirect } from 'react-router';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { forgotPassword, resetForgotPasswordRequestFailure, backToLogin } from '../redux/actions/auth';
import AlertSnackbar from './AlertSnackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import MuiLink from '@material-ui/core/Link';

const mapStateToProps = (state: RootState) => {
  return {
    forgotPasswordProcessing: state.auth.forgotPasswordProcessing,
    forgotPasswordFailed: state.auth.forgotPasswordFailed,
    forgotPasswordFailedReason: state.auth.forgotPasswordFailedReason,
    forgotPasswordConfirm: state.auth.forgotPasswordConfirm,
    forgotPasswordConfirmFailed: state.auth.forgotPasswordConfirmFailed,
    forgotPasswordConfirmFailedReason: state.auth.forgotPasswordConfirmFailedReason,
    forgotPasswordLoginRedirect: state.auth.forgotPasswordLoginRedirect
  }
}

const ForgotPasswordPage = connect(mapStateToProps)((props: ForgotPasswordPageProps) => {
  const [username, setUsername] = React.useState();
  const classes = forgotPasswordPageStyles();
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
      {props.forgotPasswordLoginRedirect && (
        <Redirect to='/login' />
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
                    resetForgotPasswordRequestFailure()
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
                  props.dispatch(forgotPassword(username));
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
                    props.dispatch(forgotPassword(username));
                  }}
                >
                  Proceed with request
                </Button>
              </Grid>
              <Grid item>
                <MuiLink
                  component={Link}
                  to='/forgot-password'
                  variant='body1'
                  onClick={() => {props.dispatch(backToLogin())}}
                >
                  Back to login
                </MuiLink>
              </Grid>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </Grid>
  );
})

export default ForgotPasswordPage;