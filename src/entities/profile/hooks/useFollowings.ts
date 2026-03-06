import { useQuery } from '@tanstack/react-query';

import { profileKeys } from '@/shared/model';

import { profileApi } from '../api/profileApi';

export const useFollowings = (accountname: string, limit: number = 5, skip: number = 0) => {
  return useQuery({
    queryKey: profileKeys.followings(accountname, limit, skip),
    queryFn: () => profileApi.getFollowings(accountname, limit, skip),
    enabled: !!accountname,
  });
};
