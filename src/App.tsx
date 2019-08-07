import React from 'react';
import AuthPage from './components/AuthPage';
import { unblockPage } from './constants/ComponentFunctions';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App: React.FC = () => {
  React.useEffect(() => {
    window.addEventListener('load', unblockPage);
    return () => {
      window.removeEventListener('load', unblockPage);
    }
  }, []);
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={AuthPage} />
      </Switch>
    </Router>
  );
}

export default App;
