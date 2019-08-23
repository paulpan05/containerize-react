import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root-reducer';
import { initialAuthState } from '../reducers/auth';
import { composeWithDevTools } from 'redux-devtools-extension';
import _ from 'lodash';

const saveStateToStorage = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (error) {
    console.error(error);
  }
}

const loadStateFromStorage = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

const persistedState = loadStateFromStorage();

const rootStore = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

rootStore.subscribe(_.throttle(() => {
  saveStateToStorage({
    auth: {
      ...initialAuthState,
      loggedIn: rootStore.getState().auth.loggedIn
    }
  })
}, 1000));

export default rootStore;