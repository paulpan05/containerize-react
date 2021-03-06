import { authConstants } from '../constants';
import { Auth } from 'aws-amplify';
import { ThunkActionCreatorPreset, ThunkDispatchPreset } from '../types';
import { CognitoUser } from 'amazon-cognito-identity-js';

const loginRequest = () => {
  return {
    type: authConstants.LOGIN_REQUEST
  };
}

const loginNewPassword = (user: any) => {
  return {
    type: authConstants.LOGIN_NEW_PASSWORD,
    user
  }
}

const loginSuccess = () => {
  return {
    type: authConstants.LOGIN_SUCCESS
  }
}

const loginFailure = (reason: string) => {
  return {
    type: authConstants.LOGIN_FAILURE,
    reason
  }
}

const loginFailureReset = () => {
  return {
    type: authConstants.LOGIN_FAILURE_RESET
  }
}

const passwordResetRequest = () => {
  return {
    type: authConstants.PASSWORD_RESET_REQUEST
  }
}

const passwordResetFailure = (reason: string) => {
  return {
    type: authConstants.PASSWORD_RESET_FAILURE,
    reason
  }
}

const passwordResetFailureReset = () => {
  return {
    type: authConstants.PASSWORD_RESET_FAILURE_RESET
  }
}

const backToLogin = () => {
  return {
    type: authConstants.BACK_TO_LOGIN
  }
}

const signupRequest = () => {
  return {
    type: authConstants.SIGNUP_REQUEST
  }
}

const signupFailure = (reason: string) => {
  return {
    type: authConstants.SIGNUP_FAILURE,
    reason
  }
}

const signupRequestComplete = (username: string, deliveryMedium: string) => {
  return {
    type: authConstants.SIGNUP_REQUEST_COMPLETE,
    username,
    deliveryMedium
  }
}

const resendSignupRequest = () => {
  return {
    type: authConstants.RESEND_SIGNUP_REQUEST
  }
}

const resendSignupSuccess = () => {
  return {
    type: authConstants.RESEND_SIGNUP_SUCCESS
  }
}

const resendSignupFailure = (reason: string) => {
  return {
    type: authConstants.RESEND_SIGNUP_FAILURE,
    reason
  }
}

const signupVerificationRequest = () => {
  return {
    type: authConstants.SIGNUP_VERIFICATION_REQUEST
  }
}

const signupVerificationFailure = (reason: string) => {
  return {
    type: authConstants.SIGNUP_VERIFICATION_FAILURE,
    reason
  }
}

const signupSuccess = () => {
  return {
    type: authConstants.SIGNUP_SUCCESS
  }
}

const signupFailureReset = () => {
  return {
    type: authConstants.SIGNUP_FAILURE_RESET
  }
}

const resendSignupFailureReset = () => {
  return {
    type: authConstants.RESEND_SIGNUP_FAILURE_RESET
  }
}

const resendSignupSuccessReset = () => {
  return {
    type: authConstants.RESEND_SIGNUP_SUCCESS_RESET
  }
}

const signupVerificationFailureReset = () => {
  return {
    type: authConstants.SIGNUP_VERIFICATION_FAILURE_RESET
  }
}

const resetSignedUp = () => {
  return {
    type: authConstants.RESET_SIGNED_UP
  }
}

const setSignupConfirmUsername = (username: string) => {
  return {
    type: authConstants.SET_SIGNUP_CONFIRM_USERNAME,
    username
  }
}

const getUsernameToConfirm = () => {
  return {
    type: authConstants.GET_USERNAME_TO_CONFIRM
  }
}

const redirectToSignup = () => {
  return {
    type: authConstants.REDIRECT_TO_SIGNUP
  }
}

const resetRedirectToSignup = () => {
  return {
    type: authConstants.RESET_REDIRECT_TO_SIGNUP
  }
}

const forgotPasswordRequest = () => {
  return {
    type: authConstants.FORGOT_PASSWORD_REQUEST
  }
}

const forgotPasswordRequestFailure = (reason: string) => {
  return {
    type: authConstants.FORGOT_PASSWORD_REQUEST_FAILURE,
    reason
  }
}

const forgotPasswordRequestSuccess = (username: string) => {
  return {
    type: authConstants.FORGOT_PASSWORD_REQUEST_SUCCESS,
    username
  }
}

const resetForgotPasswordRequestFailure = () => {
  return {
    type: authConstants.RESET_FORGOT_PASSWORD_REQUEST_FAILURE
  }
}

const forgotPasswordSubmitRequest = () => {
  return {
    type: authConstants.FORGOT_PASSWORD_SUBMIT_REQUEST
  }
}

const forgotPasswordSubmitRequestSuccess = () => {
  return {
    type: authConstants.FORGOT_PASSWORD_SUBMIT_REQUEST_SUCCESS
  }
}

const forgotPasswordSubmitRequestFailure = (reason: string) => {
  return {
    type: authConstants.FORGOT_PASSWORD_SUBMIT_REQUEST_FAILURE,
    reason
  }
}

const resetForgotPasswordLoginRedirect = () => {
  return {
    type: authConstants.RESET_FORGOT_PASSWORD_LOGIN_REDIRECT
  }
}

const resetForgotPasswordSubmitRequestFailure = () => {
  return {
    type: authConstants.RESET_FORGOT_PASSWORD_SUBMIT_REQUEST_FAILURE
  }
}

const setUsername = (username: string) => {
  return {
    type: authConstants.SET_USERNAME,
    username
  }
}

const pageloadLoggedIn = () => {
  return {
    type: authConstants.PAGE_LOAD_LOGGED_IN
  }
}

const pageloadNotLoggedIn = () => {
  return {
    type: authConstants.PAGE_LOAD_NOT_LOGGED_IN
  }
}

const signoutWarn = () => {
  return {
    type: authConstants.SIGNOUT_WARN
  }
}

const signoutRequest = () => {
  return {
    type: authConstants.SIGNOUT_REQUEST
  }
}

const signoutSuccess = () => {
  return {
    type: authConstants.SIGNOUT_SUCCESS
  }
}

const signoutFailure = (reason: string) => {
  return {
    type: authConstants.SIGNOUT_FAILURE,
    reason
  }
}

const resetSignoutFailure = () => {
  return {
    type: authConstants.RESET_SIGNOUT_FAILURE
  }
}

const handleAuthChallenge = (user: any, dispatch: ThunkDispatchPreset) => {
  switch (user.challengeName) {
    case 'NEW_PASSWORD_REQUIRED':
      dispatch(loginNewPassword(user));
      break;
  }
}

const loginPasswordReset: ThunkActionCreatorPreset = (user: any, newPassword: any) => {
  return async (dispatch) => {
    try {
      dispatch(passwordResetRequest());
      const loggedUser =
        await Auth.completeNewPassword(
          user,
          newPassword,
          []
        );
      if (loggedUser.challengeName) {
        handleAuthChallenge(loggedUser, dispatch);
      } else {
        dispatch(setUsername((loggedUser as CognitoUser).getUsername()));
        dispatch(loginSuccess());
      }
    } catch (error) {
      if (error.message) {
        dispatch(passwordResetFailure(error.message));
      } else {
        dispatch(passwordResetFailure('Unknown error: Please check console output.'));
        console.error(error)
      }
    }
  }
}

const login: ThunkActionCreatorPreset = (id: string, password: string) => {
  return async (dispatch) => {
    try {
      dispatch(loginRequest());
      const user = await Auth.signIn(id, password);
      if (user.challengeName) {
        handleAuthChallenge(user, dispatch);
      } else {
        dispatch(setUsername((user as CognitoUser).getUsername()));
        dispatch(loginSuccess());
      }
    } catch (error) {
      if (error.code === 'UserNotConfirmedException') {
        dispatch(getUsernameToConfirm());
      } else if (error.message) {
        dispatch(loginFailure(error.message));
      } else {
        dispatch(loginFailure('Unknown error: Please check console output.'));
        console.error(error)
      }
    }
  }
}

const signup: ThunkActionCreatorPreset = (username: string,
  email: string,
  password: string) => {
  return async (dispatch) => {
    try {
      dispatch(signupRequest());
      const data = await Auth.signUp({
        username: username,
        password: password,
        attributes: {
          email: email
        }
      });
      if (data.userConfirmed) {
        dispatch(signupSuccess());
      } else {
        let deliveryMedium = data.codeDeliveryDetails.DeliveryMedium;
        if (deliveryMedium === 'EMAIL') {
          deliveryMedium = 'Email';
        }
        dispatch(signupRequestComplete(username, deliveryMedium));
      }
    } catch (error) {
      if (error.message) {
        dispatch(signupFailure(error.message));
      } else {
        dispatch(signupFailure('Unknown error: Please check console output.'));
        console.error(error)
      }
    }
  }
}

const signOut: ThunkActionCreatorPreset = () => {
  return async (dispatch) => {
    try {
      dispatch(signoutRequest());
      await Auth.signOut();
      dispatch(signoutSuccess());
    } catch (error) {
      if (error.message) {
        dispatch(signoutFailure(error.message));
      } else {
        dispatch(signoutFailure('Unknown error: Please check console output.'));
        console.error(error)
      }
    }
  }
}

const resendSignupVerification: ThunkActionCreatorPreset = (username: string) => {
  return async (dispatch) => {
    try {
      dispatch(resendSignupRequest());
      await Auth.resendSignUp(username);
      dispatch(resendSignupSuccess());
    } catch (error) {
      if (error.message) {
        dispatch(resendSignupFailure(error.message));
      } else {
        dispatch(resendSignupFailure('Unknown error: Please check console output.'));
        console.error(error)
      }
    }
  }
}

const signupVerification: ThunkActionCreatorPreset = (username: string, code: string) => {
  return async (dispatch) => {
    try {
      dispatch(signupVerificationRequest());
      await Auth.confirmSignUp(username, code);
      dispatch(signupSuccess());
    } catch (error) {
      if (error.message) {
        dispatch(signupVerificationFailure(error.message));
      } else {
        dispatch(signupVerificationFailure('Unknown error: Please check console output.'));
        console.error(error)
      }
    }
  }
}

const forgotPassword: ThunkActionCreatorPreset = (username: string) => {
  return async (dispatch) => {
    try {
      dispatch(forgotPasswordRequest());
      await Auth.forgotPassword(username);
      dispatch(forgotPasswordRequestSuccess(username));
    } catch (error) {
      if (error.message) {
        dispatch(forgotPasswordRequestFailure(error.message));
      } else {
        dispatch(forgotPasswordRequestFailure('Unknown error: Please check console output.'));
        console.error(error)
      }
    }
  }
}

const forgotPasswordSubmit: ThunkActionCreatorPreset =
  (username: string, code: string, password: string) => {
  return async (dispatch) => {
    try {
      dispatch(forgotPasswordSubmitRequest());
      await Auth.forgotPasswordSubmit(username, code, password);
      dispatch(forgotPasswordSubmitRequestSuccess());
    } catch (error) {
      if (error.message) {
        dispatch(forgotPasswordSubmitRequestFailure(error.message));
      } else {
        dispatch(forgotPasswordSubmitRequestFailure('Unknown error: Please check console output.'));
        console.error(error)
      }
    }
  }
}

const performWithAuthenticatedUser: ThunkActionCreatorPreset = (loggedIn: boolean, todo?: Function) => {
  return async (dispatch) => {
    try {
      const user: CognitoUser = await Auth.currentAuthenticatedUser();
      dispatch(setUsername(user.getUsername()));
      dispatch(pageloadLoggedIn());
      if (todo) {
        todo();
      }
    } catch (error) {
      if (loggedIn) {
        dispatch(signoutWarn());
      } else {
        dispatch(pageloadNotLoggedIn());
      }
    }
  }
}

export const authActions = {
  login,
  loginSuccess,
  loginFailureReset,
  loginPasswordReset,
  passwordResetRequest,
  passwordResetFailureReset,
  backToLogin,
  signup,
  resendSignupVerification,
  signupVerification,
  signupFailureReset,
  resendSignupFailureReset,
  resendSignupSuccessReset,
  signupVerificationFailureReset,
  resetSignedUp,
  setSignupConfirmUsername,
  signupRequestComplete,
  redirectToSignup,
  resetRedirectToSignup,
  forgotPassword,
  forgotPasswordSubmit,
  resetForgotPasswordLoginRedirect,
  resetForgotPasswordRequestFailure,
  resetForgotPasswordSubmitRequestFailure,
  setUsername,
  pageloadLoggedIn,
  pageloadNotLoggedIn,
  signoutWarn,
  performWithAuthenticatedUser,
  signOut,
  resetSignoutFailure
};