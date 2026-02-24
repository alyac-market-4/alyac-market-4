import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { Product, ProductDetail } from '@/shared/model';

import { productKeys } from '@/shared/model';

import type { UpdateProductRequest } from '../model/types';
import { productApi } from './productApi';

export const useUserProductsQuery = (accountname: string, limit: number = 10, skip: number = 0) => {
  return useQuery({
    queryKey: productKeys.list(accountname, limit, skip),
    queryFn: () => productApi.getUserProducts(accountname, limit, skip),
    enabled: !!accountname,
  });
};

export const useProductDetailQuery = (productId: string) => {
  return useQuery({
    queryKey: productKeys.detail(productId),
    queryFn: () => productApi.getProductDetail(productId),
    enabled: !!productId,
  });
};

export const useProductMutation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    ProductDetail, // 반환 타입 (Promise<ProductDetail>)
    Error,
    Product // 요청 타입 (createProduct(product: Product))
  >({
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
