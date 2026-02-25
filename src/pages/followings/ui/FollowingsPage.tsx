import { useMemo } from 'react';

import { useParams } from 'react-router-dom';

import { useFollowingsQuery, useProfileMutation } from '@/entities/profile';
import { getTokenUserInfo } from '@/shared/lib';
import { BackButton, Button, ErrorView, LoadingState, ProfileAvatar } from '@/shared/ui';
import { Header } from '@/widgets/header';

export const FollowingsPage = () => {
  const { accountname = '' } = useParams();
  const {
    data: followings = [],
    isLoading: isFollowingsLoading,
    isError: isFollowingsError,
    refetch: refetchFollowings,
  } = useFollowingsQuery(accountname);
  const {
    data: myFollowings = [],
    isLoading: isMyFollowingsLoading,
    isError: isMyFollowingsError,
    refetch: refetchMyFollowings,
  } = useFollowingsQuery(getTokenUserInfo().accountname);
  const { followMutation, unfollowMutation } = useProfileMutation();

  const followingsWithIsFollow = useMemo(() => {
    return followings.map((following) => ({
      ...following,
      isFollow: myFollowings.some((following) => following._id === following._id),
    }));
  }, [followings, myFollowings]);

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
              Followings
            </h1>
          </div>
        }
      />
      <main className="flex-1 overflow-y-auto pb-16">
        <div className="divide-border divide-y">
          {isFollowingsLoading || isMyFollowingsLoading ? (
            <LoadingState />
          ) : isFollowingsError || isMyFollowingsError ? (
            <ErrorView
              message="팔로잉한 유저 불러오기 실패"
              onRetry={() => {
                refetchFollowings();
                refetchMyFollowings();
              }}
            />
          ) : followingsWithIsFollow.length > 0 ? (
            followingsWithIsFollow.map((following) => (
              <div key={following.accountname} className="flex items-center gap-3 px-4 py-4">
                <button type="button" className="flex-shrink-0">
                  <ProfileAvatar src={following.image} alt={following.username} size="lg" />
                </button>
                <button type="button" className="min-w-0 flex-1 text-left">
                  <p className="text-foreground truncate text-sm font-semibold">
                    {following.username}
                  </p>
                  <p className="text-muted-foreground truncate text-xs">{following.intro}</p>
                </button>
                {following.accountname ===
                getTokenUserInfo().accountname ? null : following.isFollow ? (
                  <Button
                    onClick={() => handleUnfollow(following.accountname)}
                    type="button"
                    variant="default"
                  >
                    언팔로우
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleFollow(following.accountname)}
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
              <p className="text-muted-foreground">팔로잉한 유저가 없습니다.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};
