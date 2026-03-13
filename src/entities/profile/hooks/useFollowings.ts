import { useQuery } from '@tanstack/react-query';

import { profileApi } from '../api/profileApi';
import { profileKeys } from '../model/keys';

export const useFollowings = (accountname: string, limit: number = 10, skip: number = 0) => {
  return useQuery({
    queryKey: profileKeys.followings(accountname, limit, skip),
    queryFn: () => profileApi.getFollowings(accountname, limit, skip),
    enabled: !!accountname,
  });
};
