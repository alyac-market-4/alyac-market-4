import { FollowStat, ProfileInfo } from '@/entities/profile';
import type { User } from '@/shared/model';
import { ProfileAvatar } from '@/shared/ui';

interface ProfileCardProps {
  user: User;
}

export const ProfileCard = ({ user }: ProfileCardProps) => {
  return (
    <>
      <div className="flex items-center justify-center gap-12">
        <FollowStat
          label="Followers"
          count={user.followerCount}
          link={`/followers/${user.accountname}`}
        />
        <ProfileAvatar src={user.image} alt={user.username} size="xl" />
        <FollowStat
          label="Followings"
          count={user.followingCount}
          link={`/followings/${user.accountname}`}
        />
      </div>
      <ProfileInfo username={user.username} accountname={user.accountname} intro={user.intro} />
    </>
  );
};
