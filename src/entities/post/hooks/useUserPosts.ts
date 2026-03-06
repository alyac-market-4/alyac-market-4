import { useQuery } from '@tanstack/react-query';

import { postKeys } from '@/shared/model';

import { postApi } from '../api/postApi';

export const useUserPosts = (accountname: string, limit: number = 5, skip: number = 0) => {
  return useQuery({
    queryKey: postKeys.user(accountname, limit, skip),
    queryFn: () => postApi.getUserPosts(accountname, limit, skip),
    enabled: !!accountname,
  });
};
