import { useInfiniteQuery } from '@tanstack/react-query';

import { productKeys } from '@/shared/model';

import { productApi } from '../api/productApi';

export const useUserInfiniteProducts = (accountname: string, limit: number = 5) => {
  return useInfiniteQuery({
    queryKey: productKeys.list(accountname, limit),
    queryFn: ({ pageParam = 0 }) => productApi.getUserProducts(accountname, limit, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) return undefined;
      return allPages.length * limit;
    },
    enabled: !!accountname,
  });
};
