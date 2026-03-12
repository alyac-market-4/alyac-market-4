import { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { profileKeys, useFollow, useUnfollow } from '@/entities/profile';
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
  const queryClient = useQueryClient();

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

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.all });
    };
  }, []);

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
