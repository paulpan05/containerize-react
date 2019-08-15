import { pageloadConstants } from "../constants/pageload";

const loadingPage = () => {
  return {
    type: pageloadConstants.LOADING_PAGE
  }
}

const loadingPageFinished = () => {
  return {
    type: pageloadConstants.LOADING_PAGE_FINISHED
  }
}

const setPreviousRoute = (route: string) => {
  return {
    type: pageloadConstants.SET_PREVIOUS_PAGE_ROUTE,
    route
  }
}

export {
  loadingPage,
  loadingPageFinished,
  setPreviousRoute
}