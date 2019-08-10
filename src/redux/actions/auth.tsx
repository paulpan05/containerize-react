import { authConstants } from '../../constants/redux/auth';
import { Auth } from 'aws-amplify';
import { ThunkActionCreatorPreset } from '../../types/redux';
import { CognitoUser } from '@aws-amplify/auth';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

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

const loginSuccess = (user: any) => {
  return {
    type: authConstants.LOGIN_SUCCESS,
    user
  }
}

const loginFailure = (reason: any) => {
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

const passwordResetSuccess = (user: any) => {
  return {
    type: authConstants.PASSWORD_RESET_SUCCESS
  }
}

const loginPasswordReset: ThunkActionCreatorPreset = (user: any, newPassword: any) => {
  return async (dispatch) => {
    try {
      dispatch(passwordResetRequest());
      console.log(user.challengeParam);
      const loggedUser =
        await Auth.completeNewPassword(
          user,
          newPassword,
          []
        );
      dispatch(passwordResetSuccess(loggedUser));
      console.log(loggedUser);
    } catch (error) {
      console.log(error.code);
    }
  }
}

const login: ThunkActionCreatorPreset = (id: string, password: string) => {
  return async (dispatch) => {
    try {
      dispatch(loginRequest());
      const user = await Auth.signIn(id, password);
      console.log(user);
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        dispatch(loginNewPassword(user));
      } else {
        dispatch(loginSuccess(user));
      }
    } catch (error) {
      if (error.code === 'UserNotConfirmedException') {
      } else if (error.code === 'PasswordResetRequiredException') {
        dispatch(loginFailure('Please click "Forgot password?" to reset password'));
      } else if (error.code === 'NotAuthorizedException') {
        dispatch(loginFailure('Unauthorized login'));
      } else if (error.code === 'UserNotFoundException') {
        dispatch(loginFailure('Username or email does not exist'));
      } else if (error.code) {
        dispatch(loginFailure(`Login failed with error ${error.code}`));
      } else {
        dispatch(loginFailure('Login failed: unknown error'));
      }
    }
  }
}

export { login, loginFailureReset, loginPasswordReset };