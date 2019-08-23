export const enum authConstants {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_FAILURE_RESET,
  LOGIN_NEW_PASSWORD,
  LOGIN_PASSWORD_RESET,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_FAILURE,
  PASSWORD_RESET_FAILURE_RESET,
  BACK_TO_LOGIN,
  SIGNUP_REQUEST,
  SIGNUP_REQUEST_COMPLETE,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  RESEND_SIGNUP_REQUEST,
  RESEND_SIGNUP_SUCCESS,
  RESEND_SIGNUP_FAILURE,
  SIGNUP_VERIFICATION_REQUEST,
  SIGNUP_VERIFICATION_FAILURE,
  SIGNUP_FAILURE_RESET,
  RESEND_SIGNUP_FAILURE_RESET,
  RESEND_SIGNUP_SUCCESS_RESET,
  SIGNUP_VERIFICATION_FAILURE_RESET,
  RESET_SIGNED_UP,
  SET_SIGNUP_CONFIRM_USERNAME,
  GET_USERNAME_TO_CONFIRM,
  REDIRECT_TO_SIGNUP,
  RESET_REDIRECT_TO_SIGNUP,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST_FAILURE,
  FORGOT_PASSWORD_REQUEST_SUCCESS,
  FORGOT_PASSWORD_SUBMIT_REQUEST,
  FORGOT_PASSWORD_SUBMIT_REQUEST_SUCCESS,
  FORGOT_PASSWORD_SUBMIT_REQUEST_FAILURE,
  RESET_FORGOT_PASSWORD_LOGIN_REDIRECT,
  RESET_FORGOT_PASSWORD_REQUEST_FAILURE,
  RESET_FORGOT_PASSWORD_SUBMIT_REQUEST_FAILURE,
  SET_USERNAME,
  PAGE_LOAD_LOGGED_IN,
  PAGE_LOAD_NOT_LOGGED_IN,
  SIGNOUT_WARN,
  SIGNOUT_REQUEST,
  SIGNOUT_SUCCESS,
  SIGNOUT_FAILURE,
  RESET_SIGNOUT_FAILURE
}