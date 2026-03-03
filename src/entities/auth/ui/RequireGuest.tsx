import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/entities/auth';

export const RequireGuest = () => {
  const { checkTokenQuery } = useAuth();

  if (checkTokenQuery.isLoading) {
    return null;
  }

  if (checkTokenQuery.data) {
    return <Navigate to="/feed" />;
  }

  return <Outlet />;
};
