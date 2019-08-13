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
  signupConfirmUsername: '',
  resendingSignup: false,
  resendSuccess: false,
  resendFailed: false,
  verifyingSignup: false,
  verifyFailed: false,
  signedUp: false
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
        loginFailed: false,
        signingUp: false,
        signupFailed: false,
        signupConfirm: false,
        resendingSignup: false,
        resendFailed: false,
        resendSuccess: false,
        verifyingSignup: false,
        verifyFailed: false
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
        signingUp: false,
        signupConfirm: true,
        signupConfirmMedium: action.deliveryMedium,
        signupConfirmUsername: action.username
      }
    
    case authConstants.RESEND_SIGNUP_REQUEST:
      return {
        ...state,
        resendingSignup: true,
        resendSuccess: false,
        resendFailed: false
      }

    case authConstants.RESEND_SIGNUP_SUCCESS:
      return {
        ...state,
        resendingSignup: false,
        resendSuccess: true
      }
    
    case authConstants.RESEND_SIGNUP_FAILURE:
      return {
        ...state,
        resendingSignup: false,
        resendFailed: true
      }

    case authConstants.SIGNUP_VERIFICATION_REQUEST:
      return {
        ...state,
        verifyingSignup: true,
        verifyFailed: false
      }

    case authConstants.SIGNUP_VERIFICATION_FAILURE:
      return {
        ...state,
        verifyingSignup: false,
        verifyFailed: true
      }

    case authConstants.SIGNUP_SUCCESS:
      return {
        ...state,
        verifyingSignup: false,
        signupConfirm: false,
        signedUp: true
      }
    
    case authConstants.SIGNUP_FAILURE_RESET:
      return {
        ...state,
        signupFailed: false
      }
    
    case authConstants.RESEND_SIGNUP_FAILURE_RESET:
      return {
        ...state,
        resendFailed: false
      }
    
    case authConstants.RESEND_SIGNUP_SUCCESS_RESET:
      return {
        ...state,
        resendSuccess: false
      }
    
    case authConstants.SIGNUP_VERIFICATION_FAILURE_RESET:
      return {
        ...state,
        verifyFailed: false
      }

    case authConstants.RESET_SIGNED_UP:
      return {
        ...state,
        signedUp: false
      }

    default:
      return state;
  }
}

export default auth;