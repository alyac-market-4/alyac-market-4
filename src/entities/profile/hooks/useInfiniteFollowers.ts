import { useInfiniteQuery } from '@tanstack/react-query';

import { profileApi } from '../api/profileApi';
import { profileKeys } from '../model/keys';

export const useInfiniteFollowers = (accountname: string, limit: number = 10) => {
  return useInfiniteQuery({
    queryKey: profileKeys.infiniteFollowers(accountname, limit),
    queryFn: ({ pageParam = 0 }) => profileApi.getFollowers(accountname, limit, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) return undefined;
      return allPages.length * limit;
    },
    enabled: !!accountname,
  });
};
