import { Navigate, Outlet } from 'react-router-dom';

import { useCheckToken } from '../hooks/useCheckToken';

export const RequireAuth = () => {
  const { data, isLoading } = useCheckToken();

  if (isLoading) {
    return null;
  }

  if (!data) {
    return <Navigate to="/sign-in" state={{ message: '로그인이 필요한 서비스입니다.' }} />;
  }

  return <Outlet />;
};
