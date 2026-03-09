import { PostSummarySkeleton, PostThumbnailSkeleton } from '@/entities/post';
import { type ViewMode } from '@/features/layout-controller';

interface PostListSkeletonProps {
  viewMode: ViewMode;
}

export function PostListSkeleton({ viewMode }: PostListSkeletonProps) {
  return (
    <>
      {viewMode === 'list' ? (
        <PostSummarySkeleton />
      ) : (
        <div className="grid grid-cols-3 gap-1 py-4">
          <PostThumbnailSkeleton />
          <PostThumbnailSkeleton />
          <PostThumbnailSkeleton />
        </div>
      )}
    </>
  );
}
