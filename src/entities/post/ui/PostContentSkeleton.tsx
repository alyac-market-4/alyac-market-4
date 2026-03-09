import { Skeleton } from '@/shared/ui';

export function PostContentSkeleton() {
  return (
    <div className="border-border border-b pb-4">
      <div className="flex items-center gap-3 px-4 py-4">
        <div className="flex items-center gap-3">
          <Skeleton className="size-12 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-4 pb-4">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
}
