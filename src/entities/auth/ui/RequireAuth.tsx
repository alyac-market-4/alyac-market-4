import { Navigate, Outlet } from 'react-router-dom';

import { useCheckToken } from '@/entities/auth';

export const RequireAuth = () => {
  const { data, isLoading } = useCheckToken();

  if (isLoading) {
    return null;
  }

  if (!data) {
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
};
