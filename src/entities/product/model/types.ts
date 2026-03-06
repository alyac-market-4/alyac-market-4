import type { Product, ProductDetail } from '@/shared/model';

export interface UpdateProductRequest {
  productId: string;
  product: Product;
}

export interface CreateProductResponse {
  product: ProductDetail;
}

export interface GetUserProductsResponse {
  count: number;
  product: ProductDetail[];
}

export interface GetProductDetailResponse {
  product: ProductDetail;
}

export interface UpdateProductResponse {
  product: ProductDetail;
}

export interface DeleteProductResponse {
  message: string;
}
