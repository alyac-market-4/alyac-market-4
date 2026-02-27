import { MessageCircle, Share2 } from 'lucide-react';

import type { Profile } from '@/entities/profile';
import { Button } from '@/shared/ui';

interface ProfileActionButtonsProps {
  handleFollow: () => void;
  user: Profile;
}

export function ProfileActionButtons({ handleFollow, user }: ProfileActionButtonsProps) {
  return (
    <>
      <Button type="button">
        <MessageCircle />
      </Button>
      <Button
        variant={user.isfollow ? 'default' : 'alyac'}
        className="w-32"
        type="button"
        onClick={handleFollow}
      >
        {user.isfollow ? '언팔로우' : '팔로우'}
      </Button>
      <Button type="button">
        <Share2 />
      </Button>
    </>
  );
}
