import { AnyAction } from "redux";
import { authConstants } from "../constants/auth";
import { AuthState } from "../types/auth";

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
  resendingSignup: false,
  resendSuccess: false,
  resendFailed: false,
  resendFailedReason: '',
  verifyingSignup: false,
  verifyFailed: false,
  verifyFailedReason: '',
  signedUp: false,
  getUsernameToConfirm: false,
  redirectToSignup: false,
  forgotPasswordProcessing: false,
  forgotPasswordFailed: false,
  forgotPasswordFailedReason: '',
  forgotPasswordConfirm: false,
  forgotPasswordConfirmFailed: false,
  forgotPasswordConfirmFailedReason: '',
  forgotPasswordLoginRedirect: false,
  username: '',
  signoutWarn: false,
  signingOut: false,
  signoutFailed: false,
  signoutFailedReason: ''
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
        user: undefined
      };

    case authConstants.GET_USERNAME_TO_CONFIRM:
      return {
        ...state,
        getUsernameToConfirm: true
      }

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
        verifyFailed: false,
        getUsernameToConfirm: false,
        forgotPasswordProcessing: false,
        forgotPasswordConfirm: false,
        forgotPasswordConfirmFailed: false,
        forgotPasswordFailed: false,
        signingOut: false,
        signoutFailed: false
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
        username: action.username
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
        resendFailed: true,
        resendFailedReason: action.reason
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
        verifyFailed: true,
        verifyFailedReason: action.reason
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

    case authConstants.SET_SIGNUP_CONFIRM_USERNAME:
      return {
        ...state,
        username: action.username
      }

    case authConstants.REDIRECT_TO_SIGNUP:
      return {
        ...state,
        redirectToSignup: true
      }

    case authConstants.RESET_REDIRECT_TO_SIGNUP:
      return {
        ...state,
        redirectToSignup: false
      }

    case authConstants.FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        forgotPasswordProcessing: true,
        forgotPasswordFailed: false
      }

    case authConstants.FORGOT_PASSWORD_REQUEST_FAILURE:
      return {
        ...state,
        forgotPasswordFailed: true,
        forgotPasswordProcessing: false,
        forgotPasswordFailedReason: action.reason
      }

    case authConstants.FORGOT_PASSWORD_REQUEST_SUCCESS:
      return {
        ...state,
        forgotPasswordConfirm: true,
        username: action.username
      }

    case authConstants.FORGOT_PASSWORD_SUBMIT_REQUEST:
      return {
        ...state,
        forgotPasswordConfirm: false,
        forgotPasswordConfirmFailed: false
      }

    case authConstants.FORGOT_PASSWORD_SUBMIT_REQUEST_FAILURE:
      return {
        ...state,
        forgotPasswordConfirm: true,
        forgotPasswordConfirmFailed: true,
        forgotPasswordConfirmFailedReason: action.reason
      }

    case authConstants.FORGOT_PASSWORD_SUBMIT_REQUEST_SUCCESS:
      return {
        ...state,
        forgotPasswordConfirm: false,
        forgotPasswordProcessing: false,
        forgotPasswordLoginRedirect: true
      }

    case authConstants.RESET_FORGOT_PASSWORD_LOGIN_REDIRECT:
      return {
        ...state,
        forgotPasswordLoginRedirect: false
      }

    case authConstants.RESET_FORGOT_PASSWORD_REQUEST_FAILURE:
      return {
        ...state,
        forgotPasswordFailed: false
      }

    case authConstants.RESET_FORGOT_PASSWORD_SUBMIT_REQUEST_FAILURE:
      return {
        ...state,
        forgotPasswordConfirmFailed: false
      }

    case authConstants.SET_USERNAME:
      return {
        ...state,
        username: action.username
      }

    case authConstants.PAGE_LOAD_LOGGED_IN:
      return {
        ...state,
        loggedIn: true,
        user: undefined,
        signoutWarn: false
      }

    case authConstants.PAGE_LOAD_NOT_LOGGED_IN:
      return {
        ...state,
        loggedIn: false,
        user: undefined,
        signoutWarn: false
      }

    case authConstants.SIGNOUT_WARN:
      return {
        ...state,
        signoutWarn: true
      }

    case authConstants.SIGNOUT_REQUEST:
      return {
        ...state,
        signoutFailed: false,
        signingOut: true
      }

    case authConstants.SIGNOUT_SUCCESS:
      return {
        ...state,
        loggedIn: false,
        signingOut: false
      }

    case authConstants.SIGNOUT_FAILURE:
      return {
        ...state,
        signingOut: false,
        signoutFailed: true,
        signoutFailedReason: action.reason
      }

    case authConstants.RESET_SIGNOUT_FAILURE:
      return {
        ...state,
        signoutFailed: false
      }

    default:
      return state;
  }
}

export default auth;