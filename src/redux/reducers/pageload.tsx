import { PageloadState } from "../types/pageload";
import { AnyAction } from "redux";
import { pageloadConstants } from "../constants/pageload";

const initialState: PageloadState = {
  pageLoading: true,
  previousPageRoute: '/main/dashboard'
}

const pageload = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case pageloadConstants.LOADING_PAGE:
      return {
        ...state,
        pageLoading: true
      }
    case pageloadConstants.LOADING_PAGE_FINISHED:
      return {
        ...state,
        pageLoading: false
      }
    case pageloadConstants.SET_PREVIOUS_PAGE_ROUTE:
      return {
        ...state,
        previousPageRoute: action.route
      }
    default:
      return state;
  }
}

export default pageload;