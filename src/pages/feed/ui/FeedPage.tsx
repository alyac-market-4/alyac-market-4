import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { IconButton } from '@/shared/ui';
import { Header } from '@/widgets/header';

export const FeedPage = () => {
  const navigate = useNavigate();

  // TODO: 나중에 실제 피드 API 붙이면 여기 posts를 서버 데이터로 바꾸면 됨
  const posts: unknown[] = [];
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
        {isEmptyFeed ? (
          <EmptyFeed onSearch={() => navigate('/feed/search')} />
        ) : (
          <div className="text-sm opacity-70">피드 목록 영역(추후 구현)</div>
        )}
      </main>
    </>
  );
};

const EmptyFeed = ({ onSearch }: { onSearch: () => void }) => {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center">
      {/* 🔻 이미지 들어갈 자리  */}
      <div className="mb-6 flex flex-col items-center">
        <div className="border-border bg-muted flex h-[120px] w-[120px] items-center justify-center rounded-full border">
          <span className="text-[10px] opacity-60">ALYAC IMAGE HERE</span>
        </div>
      </div>

      <p className="text-sm opacity-70">유저를 검색해 팔로우 해보세요!</p>

      <button
        className="mt-6 rounded-full bg-green-500 px-10 py-3 text-sm font-medium text-white hover:bg-green-600"
        onClick={onSearch}
        type="button"
      >
        검색하기
      </button>
    </section>
  );
};
