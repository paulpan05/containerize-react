import { AnyAction } from "redux";
import { authConstants } from "../../constants/redux/auth";

const initialState = {
  loggingIn: false,
  loggedIn: false
}

const auth = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true
      };
    default:
      return state;
  }
}

export default auth;