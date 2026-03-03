import { useUserPostsQuery } from '@/entities/post';
import { type Profile } from '@/entities/profile';
import type { ViewMode } from '@/features/layout-controller';
import { ErrorView } from '@/shared/ui';

import { PostSummary } from './PostSummary';
import { PostSummarySkeleton } from './PostSummarySkeleton';
import { PostThumbnail } from './PostThumbnail';
import { PostThumbnailSkeleton } from './PostThumbnailSkeleton';

const POST_SUMMARY_SKELETON_COUNT = 3;

interface PostListProps {
  viewMode: ViewMode;
  user: Profile;
}

export const PostList = ({ viewMode, user }: PostListProps) => {
  const {
    data: posts = [],
    isLoading,
    isError,
    refetch,
  } = useUserPostsQuery(user?.accountname || '');

  if (isLoading) {
    if (viewMode === 'list') {
      return (
        <>
          {Array.from({ length: POST_SUMMARY_SKELETON_COUNT }).map((_, i) => (
            <PostSummarySkeleton key={i} />
          ))}
        </>
      );
    } else {
      return (
        <div className="grid grid-cols-3 gap-1 py-4">
          {Array.from({ length: POST_SUMMARY_SKELETON_COUNT }).map((_, i) => (
            <PostThumbnailSkeleton key={i} />
          ))}
        </div>
      );
    }
  }
  if (isError) return <ErrorView message="게시글 목록 불러오기 실패" onRetry={() => refetch()} />;
  if (posts.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground text-sm">작성한 게시물이 없습니다</p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <>
        {posts.map((post) => {
          return <PostSummary key={post.id} post={post} to={`/post/${post.id}`} />;
        })}
      </>
    );
  } else {
    return (
      <div className="grid grid-cols-3 gap-1 py-4">
        {posts.map((post) => {
          return <PostThumbnail key={post.id} image={post.image} to={`/post/${post.id}`} />;
        })}
      </div>
    );
  }
};
