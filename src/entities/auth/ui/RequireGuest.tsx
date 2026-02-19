import { Navigate, Outlet } from 'react-router-dom';

import { getToken } from '@/shared/lib';

export const RequireGuest = () => {
  const token = getToken();

  if (token) {
    return <Navigate to="/feed" replace />;
  }

  return <Outlet />;
};
