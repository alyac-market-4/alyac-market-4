import { useMutation, useQueryClient } from '@tanstack/react-query';

import { productKeys } from '@/shared/model';

import { productApi } from '../api/productApi';
import type { UpdateProductRequest } from '../model/types';

export const useProductUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, product }: UpdateProductRequest) =>
      productApi.updateProduct({ productId, product }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
};
