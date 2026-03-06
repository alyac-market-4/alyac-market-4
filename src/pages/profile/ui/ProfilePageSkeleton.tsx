import { PostSummarySkeleton } from '@/entities/post';
import { ProductCardSkeleton } from '@/entities/product';
import { Skeleton } from '@/shared/ui';

export function ProfilePageSkeleton() {
  return (
    <>
      <section className="border-border border-b px-4 py-6">
        <div className="flex items-center justify-center gap-12">
          <Skeleton className="h-14 w-20" />
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="h-14 w-20" />
        </div>
        <div className="mt-4 flex flex-col items-center gap-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="mt-4 flex justify-center gap-2 px-20">
          <Skeleton className="h-9 w-32 rounded-full" />
        </div>
      </section>
      <div className="border-border border-b py-4">
        <div className="scrollbar-hide flex gap-3 overflow-x-auto px-4 pb-2">
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </div>
      </div>
      <PostSummarySkeleton />
      <PostSummarySkeleton />
      <PostSummarySkeleton />
    </>
  );
}
