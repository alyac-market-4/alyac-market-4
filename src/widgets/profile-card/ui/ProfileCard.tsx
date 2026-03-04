import { useNavigate } from 'react-router-dom';

import { FollowStat, ProfileInfo } from '@/entities/profile';
import type { User } from '@/shared/model';
import { Button, ProfileAvatar } from '@/shared/ui';

interface ProfileCardProps {
  user: User;
}

export const ProfileCard = ({ user }: ProfileCardProps) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-center gap-12">
        <FollowStat
          label="Followers"
          count={user.followerCount}
          link={`/followers/${user.accountname}`}
        />

        <Button
          onClick={() => navigate('/profile-update', { state: { user } })}
          variant="ghost"
          className="aspect-square h-auto w-auto rounded-full p-0"
        >
          <ProfileAvatar src={user.image} alt={user.username} size="xl" />
        </Button>

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
