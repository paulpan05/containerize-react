import React from 'react';
import Grid from '@material-ui/core/Grid';
import { dashboardStyles } from '../constants/styles-component';
import { connect } from 'react-redux';
import { DashboardProps } from '../types/components';
import Typography from '@material-ui/core/Typography';

const Dashboard = connect()((props: DashboardProps) => {
  const classes = dashboardStyles();
  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      className={classes.pageGrid}
    >
      <Typography variant='h3'>
        Welcome to Containerize!
      </Typography>
    </Grid>
  );
})

export default Dashboard;