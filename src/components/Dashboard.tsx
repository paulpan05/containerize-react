import React from 'react';
import { dashboardStyles } from '../constants/styles-component';
import Typography from '@material-ui/core/Typography';

const Dashboard: React.FC = () => {
  const classes = dashboardStyles();
  return (
    <Typography variant='h3' className={classes.titleText}>
      Welcome to Containerize!
    </Typography>
  );
}

export default Dashboard;