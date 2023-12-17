import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import { USER_PERMISSIONS } from '../Constants/Permissions';

const Control = ({ permissions }) => {
  const { user, loggedIn } = useAuth();
  const location = useLocation();

  if (loggedIn && user.role) {
    const userPermission = USER_PERMISSIONS.find((p) => user.role === p.role).permissions;
    const isAllowed = permissions.some((allowed) => userPermission.includes(allowed));

    return isAllowed ? <Outlet /> : <Navigate to="/" />;
  }

  return <Navigate to="/" state={{ path: location.pathname }} replace />;
};

export default Control;
