import { type UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';

import type { UserWithIsFollow } from '@/shared/model';

import { profileApi } from '../api/profileApi';
import { profileKeys } from '../model/keys';

export const useUnfollow = (options?: UseMutationOptions<UserWithIsFollow, Error, string>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (accountname: string) => profileApi.unfollowUser(accountname),
    onSuccess: (_, accountname) => {
      queryClient.invalidateQueries({ queryKey: profileKeys.detail(accountname) });
    },
    ...options,
  });
};
