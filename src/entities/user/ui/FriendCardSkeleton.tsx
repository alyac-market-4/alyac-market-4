import { Skeleton } from '@/shared/ui';

export function FriendCardSkeleton() {
  return (
    <div className="flex items-center gap-3 px-4 py-4">
      <div className="flex-shrink-0">
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
      <div className="flex flex-1 flex-col items-start">
        <div className="w-auto space-y-1 text-left">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <Skeleton className="h-9 w-24 rounded-full" />
    </div>
  );
}
