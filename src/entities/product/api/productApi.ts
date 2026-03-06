import { axiosInstance } from '@/shared/api';
import { API_ENDPOINTS, type Product, type ProductDetail } from '@/shared/model';

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
    const { data } = await axiosInstance.post<CreateProductResponse>(API_ENDPOINTS.PRODUCT.CREATE, {
      product,
    });
    return data.product;
  },

  getUserProducts: async (
    accountname: string,
    limit: number = 10,
    skip: number = 0,
  ): Promise<ProductDetail[]> => {
    const { data } = await axiosInstance.get<GetUserProductsResponse>(
      API_ENDPOINTS.PRODUCT.GET_USER_PRODUCTS(accountname),
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
      API_ENDPOINTS.PRODUCT.GET_DETAIL(productId),
    );
    return data.product;
  },

  updateProduct: async ({ productId, product }: UpdateProductRequest): Promise<ProductDetail> => {
    const { data } = await axiosInstance.put<UpdateProductResponse>(
      API_ENDPOINTS.PRODUCT.UPDATE(productId),
      {
        product,
      },
    );
    return data.product;
  },

  deleteProduct: async (productId: string): Promise<string> => {
    const { data } = await axiosInstance.delete<DeleteProductResponse>(
      API_ENDPOINTS.PRODUCT.DELETE(productId),
    );
    return data.message;
  },
};
