import { combineReducers } from "redux";
import auth from './auth';
import pageload from './pageload';

const rootReducer = combineReducers({
  auth,
  pageload
});

export default rootReducer;