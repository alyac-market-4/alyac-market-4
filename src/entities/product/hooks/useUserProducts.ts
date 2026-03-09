import { useQuery } from '@tanstack/react-query';

import { productApi } from '../api/productApi';
import { productKeys } from '../model/keys';

export const useUserProducts = (accountname: string, limit: number = 5, skip: number = 0) => {
  return useQuery({
    queryKey: productKeys.list(accountname, limit, skip),
    queryFn: () => productApi.getUserProducts(accountname, limit, skip),
    enabled: !!accountname,
  });
};
