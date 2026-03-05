import { useMutation, useQueryClient } from '@tanstack/react-query';

import { profileKeys } from '@/shared/model';

import { profileApi } from '../api/getProfile';

export const useFollow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (accountname: string) => profileApi.followUser(accountname),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.all });
    },
  });
};
