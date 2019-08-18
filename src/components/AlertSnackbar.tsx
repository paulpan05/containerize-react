import React from 'react';
import clsx from 'clsx';
import { AlertSnackbarProps, variantIcon } from '../types/components';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { alertSnackbarStyles } from '../constants/styles-component';
import { green, amber } from '@material-ui/core/colors';
import { useTheme } from '@material-ui/core/styles';

const AlertSnackbar: React.FC<AlertSnackbarProps> = (props) => {
  const classes = alertSnackbarStyles(props);
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];
  const theme = useTheme();

  let backgroundColor = '';

  switch (variant) {
    case 'success':
      backgroundColor = green[600];
      break;
    case 'error':
      backgroundColor = theme.palette.error.dark;
      break;
    case 'info':
      backgroundColor = theme.palette.primary.main;
      break;
    case 'warning':
      backgroundColor = amber[700];
      break;
  }

  return (
    <SnackbarContent
      className={className}
      style={{backgroundColor: backgroundColor}}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

export default AlertSnackbar;