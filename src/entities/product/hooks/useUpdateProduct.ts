import { useMutation, useQueryClient } from '@tanstack/react-query';

import { productApi } from '../api/productApi';
import { productKeys } from '../model/keys';
import type { UpdateProductRequest } from '../model/types';

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, product }: UpdateProductRequest) =>
      productApi.updateProduct({ productId, product }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
};
