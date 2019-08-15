import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootStore = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default rootStore;