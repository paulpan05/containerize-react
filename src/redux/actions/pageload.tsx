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

export {
  loadingPage,
  loadingPageFinished
}