import { Dispatch } from "redux";
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
  user?: CognitoUser
  signedUp: boolean
  getUsernameToConfirm: boolean
  redirectToSignup: boolean
  forgotPasswordLoginRedirect: boolean
}