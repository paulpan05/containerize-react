import { AnyAction } from "redux";
import { authConstants } from "../../constants/redux/auth";
import { AuthState } from "../../types/redux";

const initialState: AuthState = {
  loggingIn: false,
  loggedIn: false,
  loginFailed: false,
  loginFailedReason: '',
  loginNewPassword: false,
  passwordResetFailed: false,
  passwordResetFailedReason: '',
  user: undefined,
  signingUp: false,
  signupFailed: false,
  signupFailedReason: '',
  signupConfirm: false,
  signupConfirmMedium: '',
  signupConfirmUsername: ''
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
        loginFailedReason: action.reason
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
        user: action.user
      };
    
    case authConstants.PASSWORD_RESET_REQUEST:
      return {
        ...state,
        loginNewPassword: false,
        passwordResetFailed: false
      }
    
    case authConstants.PASSWORD_RESET_FAILURE:
      return {
        ...state,
        loginNewPassword: true,
        passwordResetFailed: true,
        passwordResetFailedReason: action.reason
      }
    
    case authConstants.PASSWORD_RESET_FAILURE_RESET:
      return {
        ...state,
        passwordResetFailed: false
      }
    
    case authConstants.BACK_TO_LOGIN:
      return {
        ...state,
        passwordResetFailed: false,
        loginNewPassword: false,
        user: undefined,
        loggingIn: false,
        loginFailed: false
      }
    
    case authConstants.SIGNUP_REQUEST:
      return {
        ...state,
        signingUp: true
      }
    
    case authConstants.SIGNUP_FAILURE:
      return {
        ...state,
        signingUp: false,
        signupFailed: true,
        signupFailedReason: action.reason
      }
    
    case authConstants.SIGNUP_REQUEST_COMPLETE:
      return {
        ...state,
        signupConfirm: true,
        signupConfirmMedium: action.deliveryMedium,
        signupConfirmUsername: action.username
      }

    default:
      return state;
  }
}

export default auth;