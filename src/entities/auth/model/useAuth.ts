import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getToken,
  removeToken,
  saveToken,
  useConfirmDialogStore,
  useReplaceNavigate,
} from '@/shared/lib';
import { authKeys } from '@/shared/model';

import { authApi } from '../api/auth';
import type { SignInRequest, SignUpFormData } from './types';

export const useAuth = () => {

  const { openConfirm } = useConfirmDialogStore();
  const { replaceNavigate } = useReplaceNavigate();

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
      openConfirm({
        title: '회원가입이 완료되었습니다!',
        description: '로그인 해 주세요.',
        isAlert: true,
        cancelText: '확인',
      });
    },
  });

  const logout = () => {
    removeToken();
    queryClient.clear();
    replaceNavigate('/sign-in');
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
