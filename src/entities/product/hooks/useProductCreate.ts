import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Product, ProductDetail } from '@/shared/model';
import { productKeys } from '@/shared/model';

import { productApi } from '../api/productApi';

export const useProductCreate = () => {
  const queryClient = useQueryClient();

  return useMutation<ProductDetail, Error, Product>({
    mutationFn: productApi.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
};
