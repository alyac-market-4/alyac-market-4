import { type UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';

import { profileKeys } from '@/shared/model';

import { profileApi } from '../api/profileApi';

export const useFollow = (options?: UseMutationOptions<any, Error, string>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (accountname: string) => profileApi.followUser(accountname),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.all });
    },
    ...options,
  });
};
