import {
  PostSummarySkeleton,
  PostThumbnail,
  PostThumbnailSkeleton,
  useUserPosts,
} from '@/entities/post';
import { type Profile } from '@/entities/profile';
import type { ViewMode } from '@/features/layout-controller';
import { PostSummary } from '@/features/post';
import { ErrorView } from '@/shared/ui';

interface PostListProps {
  viewMode: ViewMode;
  user: Profile;
}

export const PostList = ({ viewMode, user }: PostListProps) => {
  const { data: posts = [], isLoading, isError, refetch } = useUserPosts(user?.accountname || '');

  if (isLoading) {
    if (viewMode === 'list') {
      return (
        <>
          <PostSummarySkeleton />
          <PostSummarySkeleton />
          <PostSummarySkeleton />
        </>
      );
    } else {
      return (
        <div className="grid grid-cols-3 gap-1 py-4">
          <PostThumbnailSkeleton />
          <PostThumbnailSkeleton />
          <PostThumbnailSkeleton />
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
