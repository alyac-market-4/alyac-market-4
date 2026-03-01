import { useMutation, useQueryClient } from '@tanstack/react-query';

import { profileUpdateApi } from '@/entities/profile';

import type { ProfileUpdateRequest } from './types';

export const useProfile = () => {
  const queryClient = useQueryClient();

  const profileUpdateMutation = useMutation({
    mutationFn: (userInfo: ProfileUpdateRequest) => profileUpdateApi.profileUpdate(userInfo),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return {
    profileUpdateMutation,
  };
};
