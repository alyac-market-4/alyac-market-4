import axiosInstance from '@/shared/api/axios';
import type { Product, ProductDetail } from '@/shared/model';

import type {
  CreateProductResponse,
  DeleteProductResponse,
  GetProductDetailResponse,
  GetUserProductsResponse,
  UpdateProductRequest,
  UpdateProductResponse,
} from '../model/types';

export const productApi = {
  createProduct: async (product: Product): Promise<ProductDetail> => {
    const { data } = await axiosInstance.post<CreateProductResponse>(`/api/products`, {
      product,
    });
    return data.product;
  },

  getUserProducts: async (
    accountname: string,
    limit: number = 10,
    skip: number = 0,
  ): Promise<Product[]> => {
    const { data } = await axiosInstance.get<GetUserProductsResponse>(
      `/api/product/${accountname}`,
      {
        params: {
          limit,
          skip,
        },
      },
    );
    return data.product;
  },

  getProductDetail: async (productId: string): Promise<ProductDetail> => {
    const { data } = await axiosInstance.get<GetProductDetailResponse>(
      `/api/product/detail/${productId}`,
    );
    return data.product;
  },

  updateProduct: async ({ productId, product }: UpdateProductRequest): Promise<ProductDetail> => {
    const { data } = await axiosInstance.put<UpdateProductResponse>(`/api/product/${productId}`, {
      product,
    });
    return data.product;
  },

  deleteProduct: async (productId: string): Promise<string> => {
    const { data } = await axiosInstance.delete<DeleteProductResponse>(`/api/product/${productId}`);
    return data.message;
  },
};
