import { ActionCreator, AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { CognitoUser } from 'amazon-cognito-identity-js';

export type ThunkActionCreatorPreset = ActionCreator<ThunkAction<void, {}, {}, AnyAction>>;
export type ThunkDispatchPreset = ThunkDispatch<{}, {}, AnyAction>;
export interface RootState {
  auth: AuthState
}
export interface AuthState {
  loggingIn: boolean
  loggedIn: boolean
  loginFailed: boolean
  loginFailedReason: string
  loginNewPassword: boolean
  passwordResetFailed: boolean
  passwordResetFailedReason: string
  user?: CognitoUser,
  signingUp: boolean,
  signupFailed: boolean,
  signupFailedReason: string,
  signupConfirm: boolean,
  signupConfirmMedium: string,
  signupConfirmUsername: string,
  resendingSignup: boolean,
  resendSuccess: boolean,
  resendFailed: boolean,
  verifyingSignup: boolean,
  verifyFailed: boolean,
  signedUp: boolean,
  getUsernameToConfirm: boolean,
  redirectToSignup: boolean
}