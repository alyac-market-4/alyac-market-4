import { ProductCard, useUserProductsQuery } from '@/entities/product';
import { useMyInfoQuery } from '@/entities/user';
import { AsyncBoundary, ErrorView, LoadingState } from '@/shared/ui';

export const ProductList = () => {
  return (
    <div className="border-border border-b py-4">
      <div className="flex items-center justify-between px-4 pb-3">
        <h3 className="text-foreground text-base font-bold">판매 중인 상품</h3>
      </div>
      <div className="scrollbar-hide flex gap-3 overflow-x-auto px-4 pb-2">
        <AsyncBoundary loadingFallback={<LoadingState />} errorFallback={ErrorView}>
          <ProductListContent />
        </AsyncBoundary>
      </div>
    </div>
  );
};

const ProductListContent = () => {
  // TODO: URL params가 없는 경우만 useMyInfoQuery 사용해야 함
  const { data: user } = useMyInfoQuery();
  const { data: products } = useUserProductsQuery(user.accountname);

  return (
    <>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} to={`/product-update/${product.id}`} />
        ))
      ) : (
        <div className="py-8 text-center">
          <p className="text-muted-foreground text-sm">등록한 상품이 없습니다.</p>
        </div>
      )}
    </>
  );
};
