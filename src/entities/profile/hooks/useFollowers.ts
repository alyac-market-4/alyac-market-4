import { useQuery } from '@tanstack/react-query';

import { profileApi } from '../api/profileApi';
import { profileKeys } from '../model/keys';

export const useFollowers = (accountname: string, limit: number = 5, skip: number = 0) => {
  return useQuery({
    queryKey: profileKeys.followers(accountname, limit, skip),
    queryFn: () => profileApi.getFollowers(accountname, limit, skip),
    enabled: !!accountname,
  });
};
