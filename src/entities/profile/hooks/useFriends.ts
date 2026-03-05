import { useQuery } from '@tanstack/react-query';

import { profileKeys } from '@/shared/model';

import { profileApi } from '../api/profileApi';

export const useFriends = (
  accountname: string,
  type: 'followers' | 'followings',
  limit: number = 10,
  skip: number = 0,
) => {
  return useQuery({
    queryKey:
      type === 'followers'
        ? profileKeys.followers(accountname, limit, skip)
        : profileKeys.followings(accountname, limit, skip),
    queryFn: () =>
      type === 'followers'
        ? profileApi.getFollowers(accountname, limit, skip)
        : profileApi.getFollowings(accountname, limit, skip),
    enabled: !!accountname,
  });
};
