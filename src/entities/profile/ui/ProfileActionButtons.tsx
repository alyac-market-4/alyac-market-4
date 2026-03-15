import { MessageCircle, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '@/shared/ui';

import type { Profile } from '../model/types';

interface ProfileActionButtonsProps {
  handleFollow: () => void;
  user: Profile;
  disabled?: boolean;
}

export function ProfileActionButtons({ handleFollow, user, disabled }: ProfileActionButtonsProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center gap-2 px-20">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="rounded-full"
        onClick={() => navigate('/chat')}
      >
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
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="rounded-full"
        onClick={async () => {
          await navigator.clipboard.writeText(window.location.href);
          toast.info('링크가 복사되었습니다.');
        }}
      >
        <Share2 />
      </Button>
    </div>
  );
}
