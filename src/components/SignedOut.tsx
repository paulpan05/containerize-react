import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { SignedOutProps } from '../types/components';
import { pageloadNotLoggedIn, backToLogin } from '../redux/actions/auth';
import { signedOutStyles } from '../constants/styles-component';

const SignedOut = connect()((props: SignedOutProps) => {
  const classes = signedOutStyles();
  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      className={classes.pageGrid}
    >
      <Grid item>
        <Typography
          align='center'
          variant='h4'
          gutterBottom
        >
          User signed out.
        </Typography>
      </Grid>
      <Grid
        item
        className={classes.signedOutButton}
      >
        <Button
          variant='contained'
          color='primary'
          onClick={(event) => {
            event.preventDefault();
            props.dispatch(pageloadNotLoggedIn());
            props.dispatch(backToLogin());
          }}
        >
          Back to login
        </Button>
      </Grid>
    </Grid>
  );
})

export default SignedOut;