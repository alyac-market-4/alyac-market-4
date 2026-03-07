import { useInfiniteQuery } from '@tanstack/react-query';

import { postKeys } from '@/shared/model';

import { postApi } from '../api/postApi';

export const useInfiniteFeedPosts = (limit: number = 5) => {
  return useInfiniteQuery({
    queryKey: postKeys.feed(limit),
    queryFn: ({ pageParam = 0 }) => postApi.getFeedPosts(limit, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) return undefined;
      return allPages.length * limit;
    },
  });
};
