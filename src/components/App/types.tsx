import { Dispatch } from "redux";

export interface AppProps {
  dispatch: Dispatch<any>
  loggedIn: boolean
}