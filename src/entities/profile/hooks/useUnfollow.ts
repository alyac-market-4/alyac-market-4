import { useMutation, useQueryClient } from '@tanstack/react-query';

import { profileKeys } from '@/shared/model';

import { profileApi } from '../api/profileApi';

export const useUnfollow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (accountname: string) => profileApi.unfollowUser(accountname),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.all });
    },
  });
};
