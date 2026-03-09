import { useQuery } from '@tanstack/react-query';

import { productApi } from '../api/productApi';
import { productKeys } from '../model/keys';

export const useDetailProduct = (productId: string) => {
  return useQuery({
    queryKey: productKeys.detail(productId),
    queryFn: () => productApi.getProductDetail(productId),
    enabled: !!productId,
  });
};
