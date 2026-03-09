import { useMutation, useQueryClient } from '@tanstack/react-query';

import { profileApi } from '../api/profileApi';
import { profileKeys } from '../model/keys';
import type { UpdateProfileRequest } from '../model/types';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userInfo: UpdateProfileRequest) => profileApi.updateProfile(userInfo),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: profileKeys.detail(variables.user.accountname) });
    },
  });
};
