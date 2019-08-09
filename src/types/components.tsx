import { Dispatch } from "redux";

export interface LoginPageProps {
  dispatch: Dispatch<any>,
  loggingIn: boolean,
  loginNewPassword: boolean
}