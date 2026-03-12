import { useEffect, useRef } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { ProductCardSkeleton, useUserInfiniteProducts } from '@/entities/product';
import { type Profile } from '@/entities/profile';
import { ProductCard } from '@/features/product';
import { ErrorView, IconButton } from '@/shared/ui';

import { ProductListSkeleton } from './ProductListSkeleton';

const SCROLL_AMOUNT = 480;

interface ProductListProps {
  isMe: boolean;
  user: Profile;
}

export const ProductList = ({ isMe, user }: ProductListProps) => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useUserInfiniteProducts(user?.accountname || '');
  const products = data?.pages.flat() ?? [];
  const sentinelRef = useRef(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollProducts = (x: number) => {
    scrollRef.current?.scrollBy({
      left: x,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <ProductListSkeleton />;

  return (
    <section className="border-border border-b py-4">
      <div className="flex items-center justify-between px-4 pb-3">
        <h3 className="text-foreground text-base font-bold">판매 중인 상품</h3>
      </div>
      {isError ? (
        <ErrorView message={'상품 목록 불러오기 실패'} onRetry={() => fetchNextPage()} />
      ) : products.length > 0 ? (
        <div className="mx-2 flex items-center gap-2">
          <IconButton onClick={() => scrollProducts(-SCROLL_AMOUNT)} className="shrink-0">
            <ChevronLeft />
          </IconButton>
          <ScrollContainer horizontal innerRef={scrollRef} className="flex flex-1 gap-3 px-4 pb-2">
            {products.map((product, idx) => {
              const isLast = idx === products.length - 1;
              return (
                <ProductCard
                  key={product.id}
                  ref={isLast ? sentinelRef : null}
                  product={product}
                  isMe={isMe}
                  to={`/product-update/${product.id}`}
                />
              );
            })}
            {isFetchingNextPage && <ProductCardSkeleton />}
            {!hasNextPage && (
              <p className="group text-muted-foreground relative flex w-32 shrink-0 items-center justify-center rounded-lg text-center text-sm">
                모든 상품을 확인했습니다.
              </p>
            )}
          </ScrollContainer>
          <IconButton onClick={() => scrollProducts(SCROLL_AMOUNT)} className="shrink-0">
            <ChevronRight />
          </IconButton>
        </div>
      ) : (
        <div className="py-8 text-center">
          <p className="text-muted-foreground text-sm">등록한 상품이 없습니다.</p>
        </div>
      )}
    </section>
  );
};
