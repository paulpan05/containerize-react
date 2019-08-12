import { authConstants } from '../../constants/redux/auth';
import { Auth } from 'aws-amplify';
import { ThunkActionCreatorPreset, ThunkDispatchPreset } from '../../types/redux';
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

const loginSuccess = (user: CognitoUser) => {
  return {
    type: authConstants.LOGIN_SUCCESS,
    user
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

const resendSignupFailure = () => {
  return {
    type: authConstants.RESEND_SIGNUP_FAILURE
  }
}

const signupVerificationRequest = () => {
  return {
    type: authConstants.SIGNUP_VERIFICATION_REQUEST
  }
}

const signupVerificationFailure = () => {
  return {
    type: authConstants.SIGNUP_VERIFICATION_FAILURE
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
        dispatch(loginSuccess(loggedUser as CognitoUser));
      }
    } catch (error) {
      if (error.code === 'InvalidPasswordException') {
        dispatch(passwordResetFailure('Invalid new password entered'))
      } else if (error.code) {
        dispatch(passwordResetFailure(`Password reset failed with error: ${error.code}`));
      } else {
        dispatch(passwordResetFailure('An unknown error occured. Please try again later'));
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
        dispatch(loginSuccess(user as CognitoUser));
      }
    } catch (error) {
      if (error.code === 'UserNotConfirmedException') {
      } else if (error.code === 'PasswordResetRequiredException') {
        dispatch(loginFailure('Please click "Forgot password?" to reset password'));
      } else if (error.code === 'NotAuthorizedException') {
        dispatch(loginFailure('Unauthorized login: wrong password or blocked by server'));
      } else if (error.code === 'UserNotFoundException') {
        dispatch(loginFailure('Username or email does not exist'));
      } else if (error.code) {
        dispatch(loginFailure(`Login failed with error ${error.code}`));
      } else {
        dispatch(loginFailure('An unknown error occurred. Please try again later'));
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
      if (error.code === 'CodeDeliveryFailureException') {
        dispatch(signupFailure('Confirmation code failed to deliver. Please sign in with new account to redeliver'));
      } else if (error.code === 'InvalidPasswordException') {
        dispatch(signupFailure('Invalid password for new account'));
      } else if (error.code === 'NotAuthorizedException') {
        dispatch(signupFailure('User is not authorized to sign up at the moment'));
      } else if (error.code === 'UsernameExistsException') {
        dispatch(signupFailure('Username already exists'));
      } else if (error.code) {
        dispatch(signupFailure(`Signup failed with error: ${error.code}`));
      } else {
        dispatch(signupFailure('An unknown error occurred. Please try again later'));
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
      dispatch(resendSignupFailure());
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
      dispatch(signupVerificationFailure());
    }
  }
}

export {
  login,
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
  resetSignedUp
};