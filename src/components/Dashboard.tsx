import React from 'react';
import Grid from '@material-ui/core/Grid';
import { dashboardStyles } from '../constants/styles-component';
import { connect } from 'react-redux';
import { setPreviousRoute } from '../redux/actions/pageload';
import { DashboardProps } from '../types/components';

const Dashboard = connect()((props: DashboardProps) => {
  React.useEffect(() => {
    props.dispatch(setPreviousRoute('/main'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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