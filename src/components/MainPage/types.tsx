import { RouteComponentProps } from "react-router-dom";
import { Dispatch } from "redux";

export interface MainPageProps extends RouteComponentProps {
  dispatch: Dispatch<any>
  loggedIn: boolean
  signoutWarn: boolean
  username: string
  signingOut: boolean
  signoutFailed: boolean
  signoutFailedReason: string
}