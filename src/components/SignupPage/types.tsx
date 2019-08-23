import { Dispatch } from "redux";

export interface SignupPageProps {
  dispatch: Dispatch<any>
  loggedIn: boolean
  signingUp: boolean
  signupFailed: boolean
  signupFailedReason: string
  signupConfirm: boolean
  signupConfirmMedium: string
  username: string
  resendingSignup: boolean
  resendSuccess: boolean
  resendFailed: boolean
  resendFailedReason: string
  verifyingSignup: boolean
  verifyFailed: boolean
  verifyFailedReason: string
  signedUp: boolean
}