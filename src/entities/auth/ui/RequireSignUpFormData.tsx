import { Navigate, Outlet } from 'react-router-dom';

import { useSignUpStore } from '@/features/auth';

export const RequireSignUpFormData = () => {
  const { isValidated } = useSignUpStore();

  if (!isValidated) {
    return <Navigate to="/sign-up" replace />;
  }

  return <Outlet />;
};
