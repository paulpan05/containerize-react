import React from 'react';
import Grid from '@material-ui/core/Grid';
import { dashboardStyles } from '../constants/styles-component';
import { connect } from 'react-redux';
import { DashboardProps } from '../types/components';

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
    </Grid>
  );
})

export default Dashboard;