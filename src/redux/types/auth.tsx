import { CognitoUser } from "amazon-cognito-identity-js";

export interface AuthState {
  loggingIn: boolean
  loggedIn: boolean
  loginFailed: boolean
  loginFailedReason: string
  loginNewPassword: boolean
  passwordResetFailed: boolean
  passwordResetFailedReason: string
  user?: CognitoUser
  signingUp: boolean
  signupFailed: boolean
  signupFailedReason: string
  signupConfirm: boolean
  signupConfirmMedium: string
  resendingSignup: boolean
  resendSuccess: boolean
  resendFailed: boolean
  resendFailedReason: string
  verifyingSignup: boolean
  verifyFailed: boolean
  verifyFailedReason: string
  signedUp: boolean
  getUsernameToConfirm: boolean
  redirectToSignup: boolean
  forgotPasswordProcessing: boolean
  forgotPasswordFailed: boolean
  forgotPasswordFailedReason: string
  forgotPasswordConfirm: boolean
  forgotPasswordConfirmFailed: boolean
  forgotPasswordConfirmFailedReason: string
  forgotPasswordLoginRedirect: boolean
  username: string
  signoutWarn: boolean
}