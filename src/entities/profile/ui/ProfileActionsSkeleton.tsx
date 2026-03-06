import { Skeleton } from '@/shared/ui';

export function ProfileActionsSkeleton() {
  return (
    <div className="mt-4 flex justify-center gap-2 px-20">
      <Skeleton className="h-9 w-48 rounded-full" />
    </div>
  );
}
