import { useMutation, useQueryClient } from '@tanstack/react-query';

import { saveToken } from '@/shared/lib';
import { authKeys } from '@/shared/model';

import { authApi } from '../api/authApi';
import type { SignInRequest } from '../model/types';

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userInfo: SignInRequest) => authApi.signIn(userInfo),
    onSuccess: (data) => {
      saveToken(data.user.accessToken, data.user.refreshToken);
      queryClient.invalidateQueries({ queryKey: authKeys.session() });
    },
  });
};
