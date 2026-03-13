import { useEffect } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';

import { useInfiniteFriends, useInvalidateFriends } from '@/entities/profile';
import { FriendCard } from '@/entities/user';
import { FriendButton } from '@/features/profile';
import { getTokenUserInfo } from '@/shared/lib';
import { ErrorView } from '@/shared/ui';

import { FriendListSkeleton } from './FriendListSkeleton';

interface FriendListProps {
  isFollowersPath: boolean;
}

export function FriendList({ isFollowersPath }: FriendListProps) {
  const { accountname = '' } = useParams();
  const {
    data: usersData,
    isLoading: isUsersLoading,
    isError: isUsersError,
    fetchNextPage: fetchNextPageUsers,
    hasNextPage: hasNextPageUsers,
    isFetchingNextPage: isFetchingNextPageUsers,
  } = useInfiniteFriends(accountname, isFollowersPath ? 'followers' : 'followings');
  const users = usersData?.pages.flat() ?? [];
  const myAccountname = getTokenUserInfo().accountname;
  const invalidateFriends = useInvalidateFriends();

  useEffect(() => {
    invalidateFriends(myAccountname);
    invalidateFriends(accountname);
  }, []);

  useEffect(() => {
    if (document.documentElement.scrollHeight <= window.innerHeight) {
      if (hasNextPageUsers && !isFetchingNextPageUsers) fetchNextPageUsers();
    }
  }, [users]);

  if (isUsersLoading) return <FriendListSkeleton />;
  if (isUsersError) {
    return (
      <ErrorView
        message={isFollowersPath ? '팔로워 불러오기 실패' : '팔로잉한 유저 불러오기 실패'}
        onRetry={() => {
          fetchNextPageUsers();
        }}
      />
    );
  }

  return (
    <section>
      <InfiniteScroll
        dataLength={users.length}
        next={() => {
          fetchNextPageUsers();
        }}
        hasMore={hasNextPageUsers}
        loader={null}
      >
        {users.map((user) => (
          <FriendCard
            key={user._id}
            user={user}
            actionButton={<FriendButton user={user} disabled={isFetchingNextPageUsers} />}
          />
        ))}
      </InfiniteScroll>

      {isFetchingNextPageUsers && <FriendListSkeleton />}

      {!hasNextPageUsers && (
        <div className="flex items-center justify-center py-8">
          {users.length === 0 ? (
            !hasNextPageUsers && (
              <p className="text-muted-foreground">
                {isFollowersPath ? '팔로워가 없습니다.' : '팔로잉한 유저가 없습니다.'}
              </p>
            )
          ) : (
            <p className="text-muted-foreground">
              {isFollowersPath
                ? '모든 팔로워를 확인했습니다.'
                : '모든 팔로잉 유저들을 확인했습니다.'}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
