import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { USER_PERMISSIONS } from '../Constants/Permissions';
import useAuth from '../Hooks/useAuth';
import { Backdrop, CircularProgress } from '@mui/material';

const Control = ({ permissions }) => {
  const { user, loggedIn, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    );
  }

  if (!loggedIn || !user) {
    return <Navigate to="/" state={{ path: location.pathname }} replace />;
  }

  const userPermission = USER_PERMISSIONS.find((p) => user.role === p.role)?.permissions;
  const isAllowed = permissions.some((allowed) => userPermission.includes(allowed));

  if (!userPermission || !isAllowed) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default Control;
