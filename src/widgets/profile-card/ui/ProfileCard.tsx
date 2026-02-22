import { FollowStat, ProfileInfo } from '@/entities/profile';
import { useMyInfoQuery } from '@/entities/user';
import { AsyncBoundary, ErrorView, LoadingState, ProfileAvatar } from '@/shared/ui';

export const ProfileCard = () => {
  return (
    <AsyncBoundary loadingFallback={<LoadingState />} errorFallback={ErrorView}>
      <ProfileCardContent />
    </AsyncBoundary>
  );
};

const ProfileCardContent = () => {
  const { data: user } = useMyInfoQuery();

  return (
    <>
      <div className="flex items-center justify-center gap-12">
        <FollowStat label="Followers" count={user.followerCount} />
        <ProfileAvatar src={user.image} alt={user.username} size="xl" />
        <FollowStat label="Followings" count={user.followingCount} />
      </div>
      <ProfileInfo username={user.username} accountname={user.accountname} intro={user.intro} />
    </>
  );
};
