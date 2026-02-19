import { useNavigate } from 'react-router-dom';

import { getToken, removeToken } from '@/shared/lib';

export const useAuth = () => {
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    navigate('/sign-in');
  };

  const isAuthenticated = () => {
    return !!getToken();
  };

  return { logout, isAuthenticated };
};
