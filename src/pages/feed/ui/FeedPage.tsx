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
