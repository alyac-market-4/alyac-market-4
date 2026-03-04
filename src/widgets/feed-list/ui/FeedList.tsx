// 피드 API(/api/post/feed)로 게시물 목록을 조회하고 로딩/에러/빈상태/리스트 UI를 처리하는 컴포넌트
import { useNavigate } from 'react-router-dom';

import { useFeedPostsQuery } from '@/entities/post';
import { fullLogoAlyacGray } from '@/shared/assets';
import { Button, ErrorView, LoadingState } from '@/shared/ui';
import { PostSummary } from '@/widgets/post-list/ui/PostSummary';

export const FeedList = () => {
  const navigate = useNavigate();

  const { data: posts = [], isLoading, isError, refetch } = useFeedPostsQuery(10, 0);

  const isEmptyFeed = posts.length === 0;

  if (isLoading) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center">
        <LoadingState />
      </section>
    );
  }

  if (isError) return <ErrorView message="피드 불러오기 실패" onRetry={() => refetch()} />;

  if (isEmptyFeed) return <EmptyFeed onSearch={() => navigate('/feed/search')} />;

  return (
    <section className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostSummary key={post.id} post={post} to={`/post/${post.id}`} />
      ))}
    </section>
  );
};

const EmptyFeed = ({ onSearch }: { onSearch: () => void }) => {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center">
      <div className="mb-6 flex flex-col items-center">
        <img
          src={fullLogoAlyacGray}
          alt="알약 이미지"
          className="h-[120px] w-[120px] object-contain"
        />
      </div>

      <p className="text-sm opacity-70">유저를 검색해 팔로우 해보세요!</p>

      <Button
        variant="alyac"
        className="mt-6 rounded-full px-10 py-6 text-sm font-medium"
        onClick={onSearch}
        type="button"
      >
        검색하기
      </Button>
    </section>
  );
};
