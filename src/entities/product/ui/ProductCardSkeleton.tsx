import { Skeleton } from '@/shared/ui';

export function ProductCardSkeleton() {
  return (
    <div className="group relative flex w-32 shrink-0 cursor-pointer flex-col overflow-hidden rounded-lg">
      <Skeleton className="h-32 w-full object-cover" />
      <div className="mt-2 flex flex-col justify-start gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}
