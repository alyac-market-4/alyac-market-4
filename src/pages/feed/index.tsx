import { Search } from 'lucide-react';

import { IconButton } from '@/shared/ui/IconButton';
import { Header } from '@/widgets/header';

export const FeedPage = () => {
  return (
    <>
      <Header
        left="알약마켓 피드"
        right={
          <IconButton>
            <Search />
          </IconButton>
        }
      />
      <div>Feed</div>
    </>
  );
};
