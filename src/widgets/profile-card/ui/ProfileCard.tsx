import { Link } from 'react-router-dom';

import { FollowStat, ProfileInfo } from '@/entities/profile';
import type { User } from '@/shared/model';
import { ProfileAvatar } from '@/shared/ui';

interface ProfileCardProps {
  isMe: boolean;
  user: User;
  isFetching: boolean;
}

export const ProfileCard = ({ isMe, user, isFetching }: ProfileCardProps) => {
  return (
    <>
      <div className="flex items-center justify-center gap-12">
        <FollowStat
          label="Followers"
          count={user.followerCount}
          link={`/followers/${user.accountname}`}
          isFetching={isFetching}
        />

        {isMe ? (
          <Link to={`/profile-update`} state={{ user }} className="rounded-full">
            <ProfileAvatar src={user.image} alt={user.username} size="xl" />
          </Link>
        ) : (
          <ProfileAvatar src={user.image} alt={user.username} size="xl" />
        )}

        <FollowStat
          label="Followings"
          count={user.followingCount}
          link={`/followings/${user.accountname}`}
          isFetching={isFetching}
        />
      </div>
      <ProfileInfo username={user.username} accountname={user.accountname} intro={user.intro} />
    </>
  );
};
