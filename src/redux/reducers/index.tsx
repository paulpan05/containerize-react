import { combineReducers } from "redux";
import auth from './auth';

const rootReducer = combineReducers({
  auth
});

export { initialAuthState } from './auth';
export { rootReducer };