import React from 'react';
import { componentFunctions } from './constants';
import AuthRoutes from './components/AuthRoutes';

const App: React.FC = () => {
  React.useEffect(() => {
    window.addEventListener('load', componentFunctions.unblockPage);
    return () => {
      window.removeEventListener('load', componentFunctions.unblockPage);
    }
  }, []);
  return (
    <AuthRoutes />
  );
}

export default App;