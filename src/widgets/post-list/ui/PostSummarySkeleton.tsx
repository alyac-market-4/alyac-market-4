import { Skeleton } from '@/shared/ui';

export function PostSummarySkeleton() {
  return (
    <article className="border-border border-b py-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex flex-col justify-evenly self-stretch">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>

      <Skeleton className="mb-2 ml-12 h-4 w-2/3" />
      <Skeleton className="mb-2 ml-12 h-4 w-1/3" />

      <Skeleton className="h-40 w-full" />
    </article>
  );
}
