//외부 라이브러리
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

//assets
import alyacImage from '@/shared/assets/images/full-logo-alyac-gray.png';
//프로젝트 컴포넌트
import { Button, IconButton } from '@/shared/ui';
// ✅ Button 추가
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
      {/* 🔻 이미지   */}
      <div className="mb-6 flex flex-col items-center">
        <img src={alyacImage} alt="알약 이미지" className="h-[120px] w-[120px] object-contain" />
      </div>

      <p className="text-sm opacity-70">유저를 검색해 팔로우 해보세요!</p>

      {/* 검색하기 버튼 */}
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
