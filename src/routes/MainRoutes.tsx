import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from '../components/MainPage';
import Dashboard from '../components/Dashboard';

const MainRoutes: React.FC = () => {
  return (
    <React.Fragment>
      <Route path='/dashboard'
        render={() => (<MainPage innerComponent={<Dashboard/>} />)}
      />
    </React.Fragment>
  );
}

export default MainRoutes;