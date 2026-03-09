import { useMutation, useQueryClient } from '@tanstack/react-query';

import { saveToken } from '@/shared/lib';

import { authApi } from '../api/authApi';
import { authKeys } from '../model/keys';
import type { SignInRequest } from '../model/types';

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userInfo: SignInRequest) => authApi.signIn(userInfo),
    onSuccess: async (data) => {
      saveToken(data.user.accessToken, data.user.refreshToken);
      await queryClient.invalidateQueries({ queryKey: authKeys.session() });
    },
  });
};
