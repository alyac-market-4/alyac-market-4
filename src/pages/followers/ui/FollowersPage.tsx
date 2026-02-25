import { useMemo } from 'react';

import { Link, useParams } from 'react-router-dom';

import { useFollowersQuery, useFollowingsQuery, useProfileMutation } from '@/entities/profile';
import { getTokenUserInfo } from '@/shared/lib';
import { BackButton, Button, ErrorView, LoadingState, ProfileAvatar } from '@/shared/ui';
import { Header } from '@/widgets/header';

export const FollowersPage = () => {
  const { accountname = '' } = useParams();
  const {
    data: followers = [],
    isLoading: isFollowersLoading,
    isError: isFollowersError,
    refetch: refetchFollowers,
  } = useFollowersQuery(accountname);
  const {
    data: followings = [],
    isLoading: isFollowingsLoading,
    isError: isFollowingsError,
    refetch: refetchFollowings,
  } = useFollowingsQuery(getTokenUserInfo().accountname);
  const { followMutation, unfollowMutation } = useProfileMutation();

  const followersWithIsFollow = useMemo(() => {
    return followers.map((follower) => ({
      ...follower,
      isFollow: followings.some((following) => following._id === follower._id),
    }));
  }, [followers, followings]);

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
              Followers
            </h1>
          </div>
        }
      />
      <main className="flex-1 overflow-y-auto pb-16">
        <div className="divide-border divide-y">
          {isFollowersLoading || isFollowingsLoading ? (
            <LoadingState />
          ) : isFollowersError || isFollowingsError || !accountname ? (
            <ErrorView
              message="팔로워 불러오기 실패"
              onRetry={() => {
                refetchFollowers();
                refetchFollowings();
              }}
            />
          ) : followersWithIsFollow.length > 0 ? (
            followersWithIsFollow.map((follower) => (
              <div key={follower.accountname} className="flex items-center gap-3 px-4 py-4">
                <Link to={`/profile/${follower.accountname}`} className="flex-shrink-0">
                  <ProfileAvatar src={follower.image} alt={follower.username} size="lg" />
                </Link>
                <Link to={`/profile/${follower.accountname}`} className="min-w-0 flex-1 text-left">
                  <p className="text-foreground truncate text-sm font-semibold">
                    {follower.username}
                  </p>
                  <p className="text-muted-foreground truncate text-xs">{follower.intro}</p>
                </Link>
                {follower.accountname ===
                getTokenUserInfo().accountname ? null : follower.isFollow ? (
                  <Button
                    onClick={() => handleUnfollow(follower.accountname)}
                    type="button"
                    variant="default"
                  >
                    언팔로우
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleFollow(follower.accountname)}
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
              <p className="text-muted-foreground">팔로워가 없습니다.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};
