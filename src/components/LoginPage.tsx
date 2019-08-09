import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { loginPageStyles } from '../constants/styles-component';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import loadingImg from '../img/Loading.svg';
import { LoginPageProps } from '../types/components';
import { login } from '../redux/actions/auth';
import { RootState } from '../types/redux';

const mapStateToProps = (state: RootState) => {
  return {
    loggingIn: state.auth.loggingIn,
    loginNewPassword: state.auth.loginNewPassword
  }
}

const LoginPage = connect(mapStateToProps)((props: LoginPageProps) => {
  const [id, setId] = React.useState();
  const [password, setPassword] = React.useState();
  const classes = loginPageStyles();
  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      className={classes.pageGrid}
    >
      {props.loggingIn && !props.loginNewPassword && (
        <React.Fragment>
          <Grid item>
            <Typography align='center' variant='h4'>
              Signing in
            </Typography>
          </Grid>
          <Grid item>
            <img src={loadingImg} alt='loading' className={classes.loadImg} />
          </Grid>
        </React.Fragment>
      )}
      {!props.loggingIn && (
        <React.Fragment>
          <Grid item>
            <img src={logo} alt='logo' className={classes.logo} />
          </Grid>
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
            <TextField
              label='Email or username'
              type='text'
              name='session[username_or_email]'
              autoComplete='on'
              margin='normal'
              variant='outlined'
              onChange={(event) => { setId(event.target.value) }}
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
                <MuiLink component={Link} to='/forgot-password' variant='body1'>
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
              <MuiLink component={Link} to='/signup' variant='body1'>
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