import { useQuery } from '@tanstack/react-query';

import { postKeys } from '@/shared/model';

import { postApi } from '../api/postApi';

export const useFeedPosts = (limit: number = 5, skip: number = 0) => {
  return useQuery({
    queryKey: postKeys.feed(limit, skip),
    queryFn: () => postApi.getFeedPosts(limit, skip),
  });
};
