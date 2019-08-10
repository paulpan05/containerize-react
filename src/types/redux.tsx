import { ActionCreator, AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

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
  user: any
}