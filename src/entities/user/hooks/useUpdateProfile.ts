import { useMutation, useQueryClient } from '@tanstack/react-query';

import { profileKeys } from '@/shared/model';

import { userApi } from '../api/userApi';
import type { UpdateProfileRequest } from '../model/types';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userInfo: UpdateProfileRequest) => userApi.updateProfile(userInfo),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: profileKeys.detail(variables.user.accountname) });
    },
  });
};
