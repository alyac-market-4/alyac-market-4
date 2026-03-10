import { MessageCircle, Share2 } from 'lucide-react';

import { Button } from '@/shared/ui';

import type { Profile } from '../model/types';

interface ProfileActionButtonsProps {
  handleFollow: () => void;
  user: Profile;
  disabled?: boolean;
}

export function ProfileActionButtons({ handleFollow, user, disabled }: ProfileActionButtonsProps) {
  return (
    <>
      <Button type="button" variant="outline" size="icon" className="rounded-full">
        <MessageCircle />
      </Button>
      <Button
        variant={user.isfollow ? 'outline' : 'alyac'}
        className="w-32 rounded-full"
        type="button"
        onClick={handleFollow}
        disabled={disabled}
      >
        {user.isfollow ? '언팔로우' : '팔로우'}
      </Button>
      <Button type="button" variant="outline" size="icon" className="rounded-full">
        <Share2 />
      </Button>
    </>
  );
}
