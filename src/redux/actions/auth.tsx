import { authConstants } from '../../constants/redux/auth';
import { Auth } from 'aws-amplify';
import { ThunkActionCreatorPreset } from '../../types/redux';

const loginRequest = (user: any) => {
  return {
    type: authConstants.LOGIN_REQUEST,
    user
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

const login: ThunkActionCreatorPreset = (id: string, password: string) => {
  return async (dispatch) => {
    try {
      dispatch(loginRequest({ id }));
      const user = await Auth.signIn(id, password);
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        dispatch(loginNewPassword(user));
      } else {
        dispatch(loginSuccess(user));
      }
    } catch (error) {
      if (error.code === 'UserNotConfirmedException') {
      } else if (error.code === 'PasswordResetRequiredException') {
        dispatch(loginFailure('Please click "Forgot password?" to reset password'))
      } else if (error.code === 'NotAuthorizedException') {
        dispatch(loginFailure('Incorrect Password'))
      } else if (error.code === 'UserNotFoundException') {
        dispatch(loginFailure('Username or email does not exist'));
      } else {
        dispatch(loginFailure('Login failed: unknown error'));
      }
    }
  }
}

export { login };