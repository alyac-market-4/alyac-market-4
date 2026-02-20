import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { productApi } from '@/entities/product/api/productApi';
import type { UpdateProductRequest } from '@/entities/product/model/types';

export const useUserProductsQuery = (accountname: string) => {
  return useQuery({
    queryKey: ['product', 'list', accountname],
    queryFn: () => productApi.getUserProducts(accountname),
    enabled: !!accountname,
  });
};

export const useProductDetailQuery = (productId: string) => {
  return useQuery({
    queryKey: ['product', 'detail', productId],
    queryFn: () => productApi.getProductDetail(productId),
    enabled: !!productId,
  });
};

export const useProductMutation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: productApi.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ productId, product }: UpdateProductRequest) =>
      productApi.updateProduct({ productId, product }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (productId: string) => productApi.deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product'] });
    },
  });

  return { createMutation, deleteMutation, updateMutation };
};
