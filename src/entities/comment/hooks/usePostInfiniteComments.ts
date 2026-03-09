import { useInfiniteQuery } from '@tanstack/react-query';

import { commentKeys } from '@/shared/model';

import { commentApi } from '../api/commentApi';

export const usePostInfiniteComments = (postId: string, limit: number = 10) => {
  return useInfiniteQuery({
    queryKey: commentKeys.list(postId, limit),
    queryFn: ({ pageParam = 0 }) => commentApi.getPostComments(postId, limit, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) return undefined;
      return allPages.length * limit;
    },
    enabled: !!postId,
  });
};
