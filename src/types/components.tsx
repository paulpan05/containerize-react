import { Dispatch } from "redux";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import { CognitoUser } from "amazon-cognito-identity-js";

export interface LoginPageProps {
  dispatch: Dispatch<any>
  loggingIn: boolean
  loginNewPassword: boolean
  loggedIn: boolean
  loginFailed: boolean
  loginFailedReason: string
  passwordResetFailed: boolean
  passwordResetFailedReason: string
  user?: CognitoUser,
  signedUp: boolean,
  getUsernameToConfirm: boolean,
  redirectToSignup: boolean
  forgotPasswordLoginRedirect: boolean
}

export interface SignupPageProps {
  dispatch: Dispatch<any>
  signingUp: boolean
  signupFailed: boolean
  signupFailedReason: string
  signupConfirm: boolean
  signupConfirmMedium: string
  signupConfirmUsername: string
  resendingSignup: boolean
  resendSuccess: boolean
  resendFailed: boolean
  verifyingSignup: boolean
  verifyFailed: boolean
  signedUp: boolean
}

export interface ForgotPasswordPageProps {
  dispatch: Dispatch<any>
  forgotPasswordProcessing: boolean
  forgotPasswordFailed: boolean
  forgotPasswordFailedReason: string
  forgotPasswordConfirm: boolean
  forgotPasswordConfirmFailed: boolean
  forgotPasswordConfirmFailedReason: string
  forgotPasswordLoginRedirect: boolean
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