import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { signIn, signUp } from '@/entities/auth/api/auth';
import { getToken, removeToken, saveToken } from '@/shared/lib';

export const useAuth = () => {
  const navigate = useNavigate();

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      saveToken(data.user.accessToken, data.user.refreshToken);
    },
  });

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      alert('회원가입이 완료되었습니다! 로그인해 주세요.');
      navigate('/sign-in');
    },
  });

  const logout = () => {
    removeToken();
    navigate('/sign-in');
  };

  const isAuthenticated = () => {
    return !!getToken();
  };

  return {
    signInMutation,
    signUpMutation,
    logout,
    isAuthenticated,
  };
};
