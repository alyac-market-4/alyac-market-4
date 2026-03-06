import { useMutation } from '@tanstack/react-query';

import { userApi } from '../api/userApi';

export const useValidateAccountname = () => {
  return useMutation({
    mutationFn: (accountname: string) => userApi.validateAccountname({ user: { accountname } }),
  });
};
