import { Dispatch } from "redux";

export interface ForgotPasswordPageProps {
  dispatch: Dispatch<any>
  loggedIn: boolean
  forgotPasswordProcessing: boolean
  forgotPasswordFailed: boolean
  forgotPasswordFailedReason: string
  forgotPasswordConfirm: boolean
  forgotPasswordConfirmFailed: boolean
  forgotPasswordConfirmFailedReason: string
  forgotPasswordLoginRedirect: boolean
  username: string
}