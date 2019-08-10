import { AnyAction } from "redux";
import { authConstants } from "../../constants/redux/auth";
import { AuthState } from "../../types/redux";

const initialState: AuthState = {
  loggingIn: false,
  loggedIn: false,
  loginFailed: false,
  loginFailedReason: '',
  loginNewPassword: false,
  user: undefined
}

const auth = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        loginFailed: false
      };

    case authConstants.LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        loginFailed: true,
        loginFailedReason: action.reason,
        loginNewPassword: false
      };

    case authConstants.LOGIN_FAILURE_RESET:
      return {
        ...state,
        loginFailed: false
      }

    case authConstants.LOGIN_NEW_PASSWORD:
      return {
        ...state,
        loginNewPassword: true,
        user: action.user
      };

    case authConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loginNewPassword: false,
        user: action.user
      };
    
    case authConstants.PASSWORD_RESET_REQUEST:
      return {
        ...state,
        loginNewPassword: false
      }

    default:
      return state;
  }
}

export default auth;