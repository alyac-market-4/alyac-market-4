import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/entities/auth';

export const RequireAuth = () => {
  const { checkTokenQuery } = useAuth();

  if (!checkTokenQuery) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
};
