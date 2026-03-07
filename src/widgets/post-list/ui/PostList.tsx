import { PostThumbnail, useInfiniteUserPosts } from '@/entities/post';
import { type Profile } from '@/entities/profile';
import { LayoutController, type ViewMode } from '@/features/layout-controller';
import { PostSummary } from '@/features/post';
import { useIntersectionObserver } from '@/shared/lib';
import { ErrorView } from '@/shared/ui';

import { PostListSkeleton } from './PostListSkeleton';

interface PostListProps {
  viewMode: ViewMode;
  setViewMode: (viewMode: ViewMode) => void;
  user: Profile;
}

export const PostList = ({ viewMode, setViewMode, user }: PostListProps) => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteUserPosts(user?.accountname || '');
  const posts = data?.pages.flat() ?? [];
  const observerRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, hasNextPage);

  if (isLoading) return <PostListSkeleton viewMode={viewMode} />;
  if (isError)
    return <ErrorView message="게시글 목록 불러오기 실패" onRetry={() => fetchNextPage()} />;
  if (posts.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground text-sm">작성한 게시물이 없습니다</p>
      </div>
    );
  }

  const LoaderTrigger = (
    <div ref={observerRef}>
      {isFetchingNextPage && <PostListSkeleton viewMode={viewMode} />}
      {!hasNextPage && (
        <div className="py-8 text-center">
          <p className="text-muted-foreground text-sm">모든 게시물을 확인했습니다.</p>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="border-border flex items-center justify-end border-b px-4 py-4">
        <LayoutController viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      {viewMode === 'list' ? (
        <>
          {posts.map((post) => {
            return <PostSummary key={post.id} post={post} to={`/post/${post.id}`} />;
          })}
          {LoaderTrigger}
        </>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-1 py-4">
            {posts.map((post) => {
              return <PostThumbnail key={post.id} image={post.image} to={`/post/${post.id}`} />;
            })}
          </div>
          {LoaderTrigger}
        </>
      )}
    </>
  );
};
