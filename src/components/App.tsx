import React from 'react';
import AuthRoutes from '../routes/AuthRoutes';
import RootRoute from '../routes/RootRoute';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <RootRoute />
      <AuthRoutes />
    </React.Fragment>
  );
}

export default App;