import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

import { useInfiniteFeedPosts } from '@/entities/post';
import { PostSummary } from '@/features/post';
import { fullLogoAlyacGray } from '@/shared/assets';
import { Button, ErrorView } from '@/shared/ui';

import { FeedListSkeleton } from './FeedListSkeleton';

export const FeedList = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteFeedPosts();
  const posts = data?.pages.flat() ?? [];

  const isEmptyFeed = posts.length === 0;

  if (isLoading) return <FeedListSkeleton />;
  if (isError) return <ErrorView message="피드 불러오기 실패" onRetry={() => fetchNextPage()} />;
  if (isEmptyFeed) return <EmptyFeed onSearch={() => navigate('/feed/search')} />;

  return (
    <section className="flex flex-col gap-4">
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={isFetchingNextPage ? <FeedListSkeleton /> : null}
      >
        {posts.map((post) => (
          <PostSummary
            key={post.id}
            post={post}
            isFetchingNextPage={isFetchingNextPage}
            to={`/post/${post.id}`}
          />
        ))}
      </InfiniteScroll>
      {!hasNextPage && (
        <div className="py-8 text-center">
          <p className="text-muted-foreground text-sm">모든 피드를 확인했습니다.</p>
        </div>
      )}
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
