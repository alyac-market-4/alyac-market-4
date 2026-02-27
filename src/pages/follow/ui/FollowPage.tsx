import { useMemo } from 'react';

import { Link, useLocation, useParams } from 'react-router-dom';

import { useFollowersQuery, useFollowingsQuery, useProfileMutation } from '@/entities/profile';
import { getTokenUserInfo } from '@/shared/lib';
import { BackButton, Button, ErrorView, LoadingState, ProfileAvatar } from '@/shared/ui';
import { Header } from '@/widgets/header';

export const FollowPage = () => {
  const { accountname = '' } = useParams();
  const isFollowersPath = useLocation().pathname.split('/')[1] === 'followers';
  const {
    data: users = [],
    isLoading: isUsersLoading,
    isError: isUsersError,
    refetch: refetchUsers,
  } = isFollowersPath ? useFollowersQuery(accountname) : useFollowingsQuery(accountname);
  const {
    data: myFollowings = [],
    isLoading: isMyFollowingsLoading,
    isError: isMyFollowingsError,
    refetch: refetchMyFollowings,
  } = useFollowingsQuery(getTokenUserInfo().accountname);
  const { followMutation, unfollowMutation } = useProfileMutation();

  const usersWithIsFollow = useMemo(() => {
    return users.map((user) => ({
      ...user,
      isFollow: myFollowings.some((following) => following._id === user._id),
    }));
  }, [users, myFollowings]);

  const handleFollow = (accountname: string) => {
    followMutation.mutate(accountname);
  };

  const handleUnfollow = (accountname: string) => {
    unfollowMutation.mutate(accountname);
  };

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
        <div className="divide-border divide-y">
          {isUsersLoading || isMyFollowingsLoading ? (
            <LoadingState />
          ) : isUsersError || isMyFollowingsError || !accountname ? (
            <ErrorView
              message={isFollowersPath ? '팔로워 불러오기 실패' : '팔로잉한 유저 불러오기 실패'}
              onRetry={() => {
                refetchUsers();
                refetchMyFollowings();
              }}
            />
          ) : usersWithIsFollow.length > 0 ? (
            usersWithIsFollow.map((user) => (
              <div key={user.accountname} className="flex items-center gap-3 px-4 py-4">
                <Link to={`/profile/${user.accountname}`} className="flex-shrink-0">
                  <ProfileAvatar src={user.image} alt={user.username} size="lg" />
                </Link>
                <Link to={`/profile/${user.accountname}`} className="min-w-0 flex-1 text-left">
                  <p className="text-foreground truncate text-sm font-semibold">{user.username}</p>
                  <p className="text-muted-foreground truncate text-xs">{user.intro}</p>
                </Link>
                {user.accountname === getTokenUserInfo().accountname ? null : user.isFollow ? (
                  <Button
                    onClick={() => handleUnfollow(user.accountname)}
                    type="button"
                    variant="default"
                  >
                    언팔로우
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleFollow(user.accountname)}
                    type="button"
                    variant="alyac"
                  >
                    팔로우
                  </Button>
                )}
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center py-8">
              <p className="text-muted-foreground">
                {isFollowersPath ? '팔로워가 없습니다.' : '팔로잉한 유저가 없습니다.'}
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};
