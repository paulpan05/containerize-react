import { userConstants } from '../constants';
import { Auth } from 'aws-amplify';
import { ThunkActionCreator } from '../../types';

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

const login: ThunkActionCreator = (email: string, password: string) => {
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