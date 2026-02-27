import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/entities/auth';

export const RequireGuest = () => {
  const { checkTokenQuery } = useAuth();

  if (checkTokenQuery.data) {
    return <Navigate to="/feed" replace />;
  }

  return <Outlet />;
};
