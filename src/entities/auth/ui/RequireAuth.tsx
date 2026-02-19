import { Navigate, Outlet } from 'react-router-dom';

import { getToken } from '@/shared/lib';

export const RequireAuth = () => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
};
