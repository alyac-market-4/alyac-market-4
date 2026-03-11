import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import {
  MyProfileActionButtons,
  type Profile,
  ProfileActionButtons,
  useFollow,
  useUnfollow,
} from '@/entities/profile';

interface ProfileActionsProps {
  isMe: boolean;
  user: Profile;
}

export const ProfileActions = ({ isMe, user }: ProfileActionsProps) => {
  const navigate = useNavigate();
  const { mutate: follow, isPending: isFollowPending } = useFollow();
  const { mutate: unfollow, isPending: isUnfollowPending } = useUnfollow();
  const { accountname } = useParams();

  const handleFollow = (isfollow: boolean) => {
    if (!accountname) return;
    if (isfollow) {
      unfollow(accountname, {
        onError: () => {
          toast.error('언팔로우 처리에 실패했습니다.');
        },
      });
    } else {
      follow(accountname, {
        onError: () => {
          toast.error('팔로우 처리에 실패했습니다.');
        },
      });
    }
  };

  return (
    <div className="mt-4 flex justify-center gap-2 px-20">
      {isMe ? (
        <MyProfileActionButtons
          update={() => {
            navigate('/profile-update', { state: { user } });
          }}
          create={() => {
            navigate('/product-create');
          }}
        />
      ) : (
        <ProfileActionButtons
          handleFollow={() => {
            handleFollow(user.isfollow);
          }}
          user={user}
          disabled={isFollowPending || isUnfollowPending}
        />
      )}
    </div>
  );
};
