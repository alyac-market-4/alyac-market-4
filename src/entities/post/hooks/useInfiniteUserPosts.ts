import { useInfiniteQuery } from '@tanstack/react-query';

import { postKeys } from '@/shared/model';

import { postApi } from '../api/postApi';

export const useInfiniteUserPosts = (accountname: string, limit: number = 5) => {
  return useInfiniteQuery({
    queryKey: postKeys.user(accountname, limit),
    queryFn: ({ pageParam = 0 }) => postApi.getUserPosts(accountname, limit, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) return undefined;
      return allPages.length * limit;
    },
    enabled: !!accountname,
  });
};
