import { useMemo } from 'react';

import { useLocation, useParams } from 'react-router-dom';

import { useFollowings, useFriends } from '@/entities/profile';
import { FriendCard } from '@/entities/user';
import { FriendButton } from '@/features/profile';
import { getTokenUserInfo } from '@/shared/lib';
import { ErrorView } from '@/shared/ui';

import { FriendListSkeleton } from './FriendListSkeleton';

export function FriendList() {
  const { accountname = '' } = useParams();
  const isFollowersPath = useLocation().pathname.split('/')[1] === 'followers';
  const {
    data: users = [],
    isLoading: isUsersLoading,
    isError: isUsersError,
    refetch: refetchUsers,
  } = useFriends(accountname, isFollowersPath ? 'followers' : 'followings');
  const {
    data: myFollowings = [],
    isLoading: isMyFollowingsLoading,
    isError: isMyFollowingsError,
    refetch: refetchMyFollowings,
  } = useFollowings(getTokenUserInfo().accountname);

  const usersWithIsFollow = useMemo(() => {
    return users.map((user) => ({
      ...user,
      isFollow: myFollowings.some((following) => following._id === user._id),
    }));
  }, [users, myFollowings]);

  if (isUsersLoading || isMyFollowingsLoading) return <FriendListSkeleton />;
  if (isUsersError || isMyFollowingsError) {
    return (
      <ErrorView
        message={isFollowersPath ? '팔로워 불러오기 실패' : '팔로잉한 유저 불러오기 실패'}
        onRetry={() => {
          refetchUsers();
          refetchMyFollowings();
        }}
      />
    );
  }
  if (!accountname) return null;

  return (
    <section className="divide-border divide-y">
      {usersWithIsFollow.length > 0 ? (
        usersWithIsFollow.map((user) => (
          <FriendCard key={user._id} user={user} actionButton={<FriendButton user={user} />} />
        ))
      ) : (
        <div className="flex items-center justify-center py-8">
          <p className="text-muted-foreground">
            {isFollowersPath ? '팔로워가 없습니다.' : '팔로잉한 유저가 없습니다.'}
          </p>
        </div>
      )}
    </section>
  );
}
