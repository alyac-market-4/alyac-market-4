import { useParams } from 'react-router-dom';

import { useUserPostsQuery } from '@/entities/post';
import { useUserProfileQuery } from '@/entities/profile';
import type { ViewMode } from '@/features/layout-controller';
import { getTokenUserInfo } from '@/shared/lib';
import { ErrorView, LoadingState } from '@/shared/ui';

import { PostSummary } from './PostSummary';
import { PostThumbnail } from './PostThumbnail';

interface PostListProps {
  viewMode: ViewMode;
}

export const PostList = ({ viewMode }: PostListProps) => {
  const { accountname = '' } = useParams();
  const targetAccountname = accountname || getTokenUserInfo().accountname;
  const { data: user } = useUserProfileQuery(targetAccountname);
  const {
    data: posts = [],
    isLoading,
    isError,
    refetch,
  } = useUserPostsQuery(user?.accountname || '');

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorView message={'게시글 목록 불러오기 실패'} onRetry={() => refetch()} />;
  if (posts.length === 0)
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground text-sm">작성한 게시물이 없습니다</p>
      </div>
    );

  if (viewMode === 'list')
    return (
      <>
        {posts.map((post) => {
          return <PostSummary key={post.id} post={post} to={`/post/${post.id}`} />;
        })}
      </>
    );
  else {
    return (
      <div className="grid grid-cols-3 gap-1">
        {posts.map((post) => {
          return <PostThumbnail key={post.id} image={post.image} to={`/post/${post.id}`} />;
        })}
      </div>
    );
  }
};
