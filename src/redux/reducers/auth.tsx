import { AnyAction } from "redux";
import { authConstants } from "../../constants/redux/auth";

const initialState = {
  loggingIn: false,
  loggedIn: false,
  loginFailed: false,
  loginNewPassword: false
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
        loginNewPassword: false
      };
    case authConstants.LOGIN_NEW_PASSWORD:
      return {
        ...state,
        loginNewPassword: true
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loginNewPassword: false
      };
    default:
      return state;
  }
}

export default auth;