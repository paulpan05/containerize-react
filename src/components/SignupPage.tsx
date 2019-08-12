import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
import { signupPageStyles } from '../constants/styles-component';
import logo from '../img/logo.png';

const SignupPage: React.FC = () => {
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
        <TextField
          label='Username'
          type='text'
          name='username'
          autoComplete='username'
          margin='normal'
          variant='outlined'
          fullWidth
        />
        <TextField
          label='Email'
          type='email'
          name='email'
          autoComplete='email'
          margin='normal'
          variant='outlined'
          fullWidth
        />
        <TextField
          label='Password'
          type='password'
          name='password'
          autoComplete='current-password'
          margin='normal'
          variant='outlined'
          fullWidth
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
            <MuiLink component={ Link } to='/login' variant='body1'>
              Back to log in
          </MuiLink>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SignupPage;