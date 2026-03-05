import { Navigate, Outlet } from 'react-router-dom';

import { useSignUpStore } from '../model/signUpStore';

export const RequireSignUpFormData = () => {
  const { isValidated } = useSignUpStore();

  if (!isValidated) {
    return <Navigate to="/sign-up" />;
  }

  return <Outlet />;
};
