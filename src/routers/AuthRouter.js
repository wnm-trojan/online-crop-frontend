import React from 'react';
import Sidebar from '../components/includes/Sidebar';
import { Outlet } from 'react-router-dom';

const AuthRouter = () => {
    return (
        <div className="dashboard">
            <Sidebar />
            <Outlet />
        </div>
    );
  };

export default AuthRouter;