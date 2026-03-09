import { useQuery } from '@tanstack/react-query';

import { userApi } from '../api/userApi';
import { userKeys } from '../model/keys';

export const useSearchUser = (keyword: string) => {
  return useQuery({
    queryKey: userKeys.search(keyword),
    queryFn: () => userApi.searchUser(keyword),
    enabled: !!keyword,
  });
};
