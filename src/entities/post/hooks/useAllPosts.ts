import { useQuery } from '@tanstack/react-query';

import { postKeys } from '@/shared/model';

import { postApi } from '../api/postApi';

export const useAllPosts = (limit: number = 10, skip: number = 0) => {
  return useQuery({
    queryKey: postKeys.list(limit, skip),
    queryFn: () => postApi.getAllPosts(limit, skip),
  });
};
