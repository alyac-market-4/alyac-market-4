import { useQuery } from '@tanstack/react-query';

import { commentKeys } from '@/shared/model';

import { commentApi } from '../api/commentApi';

export const usePostComments = (postId: string, limit: number = 10, skip: number = 0) => {
  return useQuery({
    queryKey: commentKeys.list(postId, limit, skip),
    queryFn: () => commentApi.getPostComments(postId, limit, skip),
    enabled: !!postId,
  });
};
