import { useInfiniteQuery } from '@tanstack/react-query';

import { profileApi } from '../api/profileApi';
import { profileKeys } from '../model/keys';

export const useInfiniteFollowings = (accountname: string, limit: number = 10) => {
  return useInfiniteQuery({
    queryKey: profileKeys.followings(accountname, limit),
    queryFn: ({ pageParam = 0 }) => profileApi.getFollowings(accountname, limit, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) return undefined;
      return allPages.length * limit;
    },
    enabled: !!accountname,
  });
};
