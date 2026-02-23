import { useUserPostsQuery } from '@/entities/post';
import { useMyInfoQuery } from '@/entities/user';
import { ErrorView, LoadingState } from '@/shared/ui';

import { PostSummary } from './PostSummary';

export const PostList = () => {
  // TODO: URL params가 없는 경우만 useMyInfoQuery 사용해야 함
  const { data: user } = useMyInfoQuery();
  const {
    data: posts = [],
    isLoading,
    isError,
    refetch,
  } = useUserPostsQuery(user?.accountname || '');

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorView message={'게시글 목록 불러오기 실패'} onRetry={() => refetch()} />
      ) : posts.length > 0 ? (
        posts.map((post) => {
          return <PostSummary key={post.id} post={post} />;
        })
      ) : (
        <div className="py-8 text-center">
          <p className="text-muted-foreground text-sm">작성한 게시물이 없습니다</p>
        </div>
      )}
    </>
  );
};
