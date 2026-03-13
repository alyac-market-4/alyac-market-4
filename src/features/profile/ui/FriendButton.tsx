import { useEffect, useState } from 'react';

import { toast } from 'sonner';

import { useFollow, useUnfollow } from '@/entities/profile';
import { getTokenUserInfo } from '@/shared/lib';
import type { UserWithIsFollow } from '@/shared/model';
import { Button } from '@/shared/ui';

interface FriendButtonProps {
  user: UserWithIsFollow;
  disabled: boolean;
}

export function FriendButton({ user, disabled }: FriendButtonProps) {
  const { mutate: follow, isPending: isFollowPending } = useFollow();
  const { mutate: unfollow, isPending: isUnfollowPending } = useUnfollow();
  const [isfollow, setIsFollow] = useState(user.isfollow);

  const handleFollow = (accountname: string) => {
    setIsFollow(true);
    follow(accountname, {
      onError: () => {
        setIsFollow(false);
        toast.error('팔로우 처리에 실패했습니다.');
      },
    });
  };
  const handleUnfollow = (accountname: string) => {
    setIsFollow(false);
    unfollow(accountname, {
      onError: () => {
        setIsFollow(true);
        toast.error('언팔로우 처리에 실패했습니다.');
      },
    });
  };

  useEffect(() => {
    setIsFollow(user.isfollow);
  }, [user.isfollow]);

  return (
    <>
      {user.accountname === getTokenUserInfo().accountname ? null : isfollow ? (
        <Button
          onClick={() => handleUnfollow(user.accountname)}
          disabled={disabled || isFollowPending || isUnfollowPending}
          type="button"
          variant="outline"
          className="rounded-full"
        >
          언팔로우
        </Button>
      ) : (
        <Button
          onClick={() => handleFollow(user.accountname)}
          disabled={disabled || isFollowPending || isUnfollowPending}
          type="button"
          variant="alyac"
        >
          팔로우
        </Button>
      )}
    </>
  );
}
