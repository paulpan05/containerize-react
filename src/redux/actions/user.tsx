import { userConstants } from '../../constants/redux/user';
import { Auth } from 'aws-amplify';
import { ThunkActionCreatorPreset } from '../../types';

const loginRequest = (user: any) => {
  return {
    type: userConstants.LOGIN_REQUEST,
    user
  };
}

const loginSuccess = (user: any) => {
  return {
    type: userConstants.LOGIN_SUCCESS,
    user
  }
}

const loginFailure = (error: any) => {
  return {
    type: userConstants.LOGIN_FAILURE,
    error
  }
}

const login: ThunkActionCreatorPreset = (email: string, password: string) => {
  return (dispatch) => {
    dispatch(loginRequest({ email }));
    Auth.signIn(email, password)
      .then((user) => {
        dispatch(loginSuccess(user));
      })
      .catch((error) => {
        dispatch(loginFailure(error));
      });
  }
}

export const userActions = {
  login
}