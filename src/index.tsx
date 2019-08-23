import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Amplify from 'aws-amplify';
import './css/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { amplifyConfig } from './constants';
import rootStore from './redux/stores/root-store';
import 'github-markdown-css';
import 'highlight.js/styles/github.css';

Amplify.configure(amplifyConfig);

ReactDOM.render(
  <Provider store={rootStore}>
    <Router>
      <App />
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
