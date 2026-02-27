import { useNavigate, useParams } from 'react-router-dom';

import {
  MyProfileActionButtons,
  type Profile,
  ProfileActionButtons,
  useProfileMutation,
} from '@/entities/profile';

interface ProfileActionsProps {
  isMe: boolean;
  user: Profile;
}

export const ProfileActions = ({ isMe, user }: ProfileActionsProps) => {
  const navigate = useNavigate();
  const { followMutation, unfollowMutation } = useProfileMutation();
  const { accountname } = useParams();

  const handleFollow = (isFollow: boolean) => {
    if (!accountname) return;
    if (isFollow) {
      unfollowMutation.mutate(accountname);
    } else {
      followMutation.mutate(accountname);
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
        />
      )}
    </div>
  );
};
