import React from 'react';
import { unblockPage } from '../constants/functions-component';
import AuthRoutes from '../routes/AuthRoutes';
import RootRoute from '../routes/RootRoute';

const App: React.FC = () => {
  React.useEffect(() => {
    window.addEventListener('load', unblockPage);
    return () => {
      window.removeEventListener('load', unblockPage);
    }
  }, []);
  return (
    <React.Fragment>
      <RootRoute />
      <AuthRoutes />
    </React.Fragment>
  );
}

export default App;