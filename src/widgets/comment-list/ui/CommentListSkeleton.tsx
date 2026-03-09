import { Skeleton } from '@/shared/ui';

export function CommentListSkeleton() {
  return (
    <div className="flex gap-3 px-4 py-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
}
