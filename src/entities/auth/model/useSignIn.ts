import { useMutation } from '@tanstack/react-query';

import { signIn } from '@/entities/auth/api/signIn';
import { saveToken } from '@/shared/lib';

export const useSignIn = () => {
  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      saveToken(data.user.accessToken, data.user.refreshToken);
    },
  });
};
