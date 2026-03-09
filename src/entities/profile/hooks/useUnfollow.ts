import { type UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';

import type { User } from '@/shared/model';

import { profileApi } from '../api/profileApi';
import { profileKeys } from '../model/keys';

export const useUnfollow = (options?: UseMutationOptions<User, Error, string>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (accountname: string) => profileApi.unfollowUser(accountname),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.all });
    },
    ...options,
  });
};
