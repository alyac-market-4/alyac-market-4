import { useQuery } from '@tanstack/react-query';

import { profileKeys } from '@/shared/model';

import { profileApi } from '../api/profileApi';

export const useFollowers = (accountname: string, limit: number = 10, skip: number = 0) => {
  return useQuery({
    queryKey: profileKeys.followers(accountname, limit, skip),
    queryFn: () => profileApi.getFollowers(accountname, limit, skip),
    enabled: !!accountname,
  });
};
