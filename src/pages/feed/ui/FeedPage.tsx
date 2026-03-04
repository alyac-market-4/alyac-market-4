// 팔로우 피드 화면을 구성하고(헤더/검색 이동) 피드 목록 위젯을 렌더링하는 페이지
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { IconButton } from '@/shared/ui';
import { FeedList } from '@/widgets/feed-list';
import { Header } from '@/widgets/header';

export const FeedPage = () => {
  const navigate = useNavigate();

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
        <FeedList />
      </main>
    </>
  );
};
