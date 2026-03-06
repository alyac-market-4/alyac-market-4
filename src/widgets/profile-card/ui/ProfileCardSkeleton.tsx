import { Skeleton } from '@/shared/ui';

export const ProfileCardSkeleton = () => {
  return (
    <>
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
    </>
  );
};
