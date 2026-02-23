import { FollowStat, ProfileInfo } from '@/entities/profile';
import { useMyInfoQuery } from '@/entities/user';
import { ErrorView, LoadingState, ProfileAvatar } from '@/shared/ui';

export const ProfileCard = () => {
  const { data: user, isLoading, isError } = useMyInfoQuery();

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorView message={'프로필 카드 불러오기 실패'} onRetry={() => {}} />
      ) : (
        <>
          <div className="flex items-center justify-center gap-12">
            <FollowStat label="Followers" count={user!.followerCount} />
            <ProfileAvatar src={user!.image} alt={user!.username} size="xl" />
            <FollowStat label="Followings" count={user!.followingCount} />
          </div>
          <ProfileInfo
            username={user!.username}
            accountname={user!.accountname}
            intro={user!.intro}
          />
        </>
      )}
    </>
  );
};
