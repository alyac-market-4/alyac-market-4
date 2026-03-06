import { PostSummarySkeleton, PostThumbnailSkeleton } from '@/entities/post';
import { LayoutController, type ViewMode } from '@/features/layout-controller';

interface PostListSkeletonProps {
  viewMode: ViewMode;
  setViewMode: (viewMode: ViewMode) => void;
}

export function PostListSkeleton({ viewMode, setViewMode }: PostListSkeletonProps) {
  return (
    <>
      <div className="border-border flex items-center justify-end border-b px-4 py-4">
        <LayoutController setViewMode={setViewMode} viewMode={viewMode} />
      </div>
      {viewMode === 'list' ? (
        <>
          <PostSummarySkeleton />
          <PostSummarySkeleton />
          <PostSummarySkeleton />
        </>
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
