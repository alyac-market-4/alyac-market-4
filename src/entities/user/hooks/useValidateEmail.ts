import { useMutation } from '@tanstack/react-query';

import { userApi } from '../api/userApi';

export const useValidateEmail = () => {
  return useMutation({
    mutationFn: (email: string) => userApi.validateEmail({ user: { email } }),
  });
};
