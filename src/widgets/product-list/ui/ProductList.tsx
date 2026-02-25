import { useParams } from 'react-router-dom';

import { ProductCard, useUserProductsQuery } from '@/entities/product';
import { useUserProfileQuery } from '@/entities/profile';
import { getTokenUserInfo } from '@/shared/lib';
import { ErrorView, LoadingState } from '@/shared/ui';

export const ProductList = () => {
  const { accountname = '' } = useParams();
  const targetAccountname = accountname || getTokenUserInfo().accountname;
  const { data: user } = useUserProfileQuery(targetAccountname);
  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useUserProductsQuery(user?.accountname || '');

  return (
    <div className="border-border border-b py-4">
      <div className="flex items-center justify-between px-4 pb-3">
        <h3 className="text-foreground text-base font-bold">판매 중인 상품</h3>
      </div>
      <div className="scrollbar-hide flex gap-3 overflow-x-auto px-4 pb-2">
        {isLoading ? (
          <LoadingState />
        ) : isError ? (
          <ErrorView message={'상품 목록 불러오기 실패'} onRetry={() => refetch()} />
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} to={`/product-update/${product.id}`} />
          ))
        ) : (
          <div className="py-8 text-center">
            <p className="text-muted-foreground text-sm">등록한 상품이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};
