import { MessageCircle, Share2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { type Profile, useProfileMutation } from '@/entities/profile';
import { Button } from '@/shared/ui';

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
    <div className="mt-4 flex gap-2 px-20">
      {isMe ? (
        <>
          <Button
            onClick={() => navigate('/profile-update')}
            variant="outline"
            size="lg"
            className="flex-1"
            type="button"
          >
            프로필 수정
          </Button>
          <Button
            onClick={() => navigate('/product-create')}
            variant="outline"
            size="lg"
            className="flex-1"
            type="button"
          >
            상품 등록
          </Button>
        </>
      ) : (
        <>
          <div className="flex w-full items-center justify-center gap-3">
            <Button type="button">
              <MessageCircle />
            </Button>
            <Button
              variant={user.isfollow ? 'default' : 'alyac'}
              className="w-32"
              type="button"
              onClick={() => handleFollow(user.isfollow)}
            >
              {user.isfollow ? '언팔로우' : '팔로우'}
            </Button>
            <Button type="button">
              <Share2 />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
