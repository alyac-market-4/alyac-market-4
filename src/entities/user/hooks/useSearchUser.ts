import { useQuery } from '@tanstack/react-query';

import { userKeys } from '@/shared/model';

import { userApi } from '../api/userApi';

export const useSearchUser = (keyword: string) => {
  return useQuery({
    queryKey: userKeys.search(keyword),
    queryFn: () => userApi.searchUser(keyword),
    enabled: !!keyword,
  });
};
