import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { getToken, removeToken, saveToken } from '@/shared/lib';
import { authKeys } from '@/shared/model';

import { authApi } from '../api/auth';
import type { SignInRequest, SignUpFormData } from './types';

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const checkTokenQuery = useQuery({
    queryKey: authKeys.session(),
    queryFn: () => authApi.checkToken(),
    enabled: !!getToken(),
  });

  const signInMutation = useMutation({
    mutationFn: (userInfo: SignInRequest) => authApi.signIn(userInfo),
    onSuccess: (data) => {
      saveToken(data.user.accessToken, data.user.refreshToken);
      queryClient.invalidateQueries({ queryKey: authKeys.session() });
    },
  });

  const signUpMutation = useMutation({
    mutationFn: (userInfo: SignUpFormData) => authApi.signUp({ user: userInfo }),
    onSuccess: () => {
      alert('회원가입이 완료되었습니다! 로그인해 주세요.');
    },
  });

  const logout = () => {
    removeToken();
    queryClient.clear();
    navigate('/sign-in');
  };

  const isAuthenticated = !!getToken();

  return {
    checkTokenQuery,
    signInMutation,
    signUpMutation,
    logout,
    isAuthenticated,
  };
};
