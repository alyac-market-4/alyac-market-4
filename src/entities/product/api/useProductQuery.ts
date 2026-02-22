import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { productKeys } from '../model/keys';
import type { UpdateProductRequest } from '../model/types';
import { productApi } from './productApi';

export const useUserProductsQuery = (accountname: string) => {
  return useSuspenseQuery({
    queryKey: productKeys.list(accountname),
    queryFn: () => productApi.getUserProducts(accountname),
  });
};

export const useProductDetailQuery = (productId: string) => {
  return useSuspenseQuery({
    queryKey: productKeys.detail(productId),
    queryFn: () => productApi.getProductDetail(productId),
  });
};

export const useProductMutation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: productApi.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ productId, product }: UpdateProductRequest) =>
      productApi.updateProduct({ productId, product }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (productId: string) => productApi.deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });

  return { createMutation, deleteMutation, updateMutation };
};
