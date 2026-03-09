import { useMutation, useQueryClient } from '@tanstack/react-query';

import { productApi } from '../api/productApi';
import { productKeys } from '../model/keys';

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => productApi.deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
};
