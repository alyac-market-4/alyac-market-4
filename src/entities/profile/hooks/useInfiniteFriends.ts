import { useInfiniteQuery } from '@tanstack/react-query';

import { profileApi } from '../api/profileApi';
import { profileKeys } from '../model/keys';

export const useInfiniteFriends = (
  accountname: string,
  type: 'followers' | 'followings',
  limit: number = 5,
) => {
  return useInfiniteQuery({
    queryKey:
      type === 'followers'
        ? profileKeys.infiniteFollowers(accountname, limit)
        : profileKeys.infiniteFollowings(accountname, limit),
    queryFn: ({ pageParam = 0 }) =>
      type === 'followers'
        ? profileApi.getFollowers(accountname, limit, pageParam)
        : profileApi.getFollowings(accountname, limit, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) return undefined;
      return allPages.length * limit;
    },
    enabled: !!accountname,
  });
};
