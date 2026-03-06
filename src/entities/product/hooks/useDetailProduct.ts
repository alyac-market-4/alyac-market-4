import { useQuery } from '@tanstack/react-query';

import { productKeys } from '@/shared/model';

import { productApi } from '../api/productApi';

export const useDetailProduct = (productId: string) => {
  return useQuery({
    queryKey: productKeys.detail(productId),
    queryFn: () => productApi.getProductDetail(productId),
    enabled: !!productId,
  });
};
