import { Dispatch } from "redux";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';

export interface LoginPageProps {
  dispatch: Dispatch<any>,
  loggingIn: boolean,
  loginNewPassword: boolean,
  loggedIn: boolean,
  loginFailed: boolean,
  loginFailedReason: string,
  user: any
}

export const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

export interface AlertSnackbarProps {
  className?: string;
  message?: string;
  onClose?: () => void;
  variant: keyof typeof variantIcon;
}