import { useMutation, useQueryClient } from '@tanstack/react-query';

import { productKeys } from '@/shared/model';

import { productApi } from '../api/productApi';

export const useProductDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => productApi.deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
};
