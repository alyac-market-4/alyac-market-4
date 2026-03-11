import { useLocation } from 'react-router-dom';

import { BackButton } from '@/shared/ui';
import { FriendList } from '@/widgets/friend-list';
import { Header } from '@/widgets/header';

export const FollowPage = () => {
  const isFollowersPath = useLocation().pathname.split('/')[1] === 'followers';

  return (
    <>
      <Header
        left={
          <div className="flex flex-row">
            <BackButton />
            <h1 className="text-foreground ml-4 flex flex-row items-center text-lg font-semibold">
              {isFollowersPath ? 'Followers' : 'Followings'}
            </h1>
          </div>
        }
      />
      <main className="flex-1 overflow-y-auto pb-16">
        <FriendList isFollowersPath={isFollowersPath} />
      </main>
    </>
  );
};
