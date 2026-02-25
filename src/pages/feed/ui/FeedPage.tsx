// 외부 라이브러리
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// 프로젝트 컴포넌트
import { useFeedPostsQuery } from '@/entities/post';
// assets
import alyacImage from '@/shared/assets/images/full-logo-alyac-gray.png';
import { Button, ErrorView, IconButton, LoadingState } from '@/shared/ui';
import { Header } from '@/widgets/header';
import { PostSummary } from '@/widgets/post-list/ui/PostSummary';

export const FeedPage = () => {
  const navigate = useNavigate();

  // ✅ 실제 피드 API 연결
  const { data: posts = [], isLoading, isError, refetch } = useFeedPostsQuery(10, 0);

  const isEmptyFeed = posts.length === 0;

  return (
    <>
      <Header
        left="알약마켓 피드"
        right={
          <IconButton onClick={() => navigate('/feed/search')} aria-label="계정 검색">
            <Search />
          </IconButton>
        }
      />

      <main className="px-4 py-4">
        {isLoading ? (
          <LoadingState />
        ) : isError ? (
          <ErrorView message="피드 불러오기 실패" onRetry={() => refetch()} />
        ) : isEmptyFeed ? (
          <EmptyFeed onSearch={() => navigate('/feed/search')} />
        ) : (
          <section className="flex flex-col gap-4">
            {posts.map((post) => (
              <PostSummary key={post.id} post={post} to={`/post/${post.id}`} />
            ))}
          </section>
        )}
      </main>
    </>
  );
};

const EmptyFeed = ({ onSearch }: { onSearch: () => void }) => {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center">
      <div className="mb-6 flex flex-col items-center">
        <img src={alyacImage} alt="알약 이미지" className="h-[120px] w-[120px] object-contain" />
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
