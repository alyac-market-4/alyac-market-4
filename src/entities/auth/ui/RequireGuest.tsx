import { Navigate, Outlet } from 'react-router-dom';

import { useCheckToken } from '@/entities/auth';

export const RequireGuest = () => {
  const { data, isLoading } = useCheckToken();

  if (isLoading) {
    return null;
  }

  if (data) {
    return <Navigate to="/feed" />;
  }

  return <Outlet />;
};
