import React from 'react';
import { unblockPage } from './constants/functions-component';
import AuthRoutes from './routes/AuthRoutes';

const App: React.FC = () => {
  React.useEffect(() => {
    window.addEventListener('load', unblockPage);
    return () => {
      window.removeEventListener('load', unblockPage);
    }
  }, []);
  return (
    <AuthRoutes />
  );
}

export default App;