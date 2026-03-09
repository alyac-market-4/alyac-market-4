import { toast } from 'sonner';

import { useFollow, useUnfollow } from '@/entities/profile';
import { getTokenUserInfo } from '@/shared/lib';
import type { User } from '@/shared/model';
import { Button } from '@/shared/ui';

interface UserWithIsFollow extends User {
  isFollow: boolean;
}

interface FriendButtonProps {
  user: UserWithIsFollow;
}

export function FriendButton({ user }: FriendButtonProps) {
  const { mutate: follow, isPending: isFollowPending } = useFollow({
    onError: () => {
      toast.error('팔로우에 실패했습니다. 다시 시도해주세요.');
    },
  });
  const { mutate: unfollow, isPending: isUnfollowPending } = useUnfollow({
    onError: () => {
      toast.error('언팔로우에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const handleFollow = (accountname: string) => {
    follow(accountname);
  };

  const handleUnfollow = (accountname: string) => {
    unfollow(accountname);
  };

  return (
    <>
      {user.accountname === getTokenUserInfo().accountname ? null : user.isFollow ? (
        <Button
          onClick={() => handleUnfollow(user.accountname)}
          disabled={isUnfollowPending}
          type="button"
          variant="outline"
          className="rounded-full"
        >
          언팔로우
        </Button>
      ) : (
        <Button
          onClick={() => handleFollow(user.accountname)}
          disabled={isFollowPending}
          type="button"
          variant="alyac"
        >
          팔로우
        </Button>
      )}
    </>
  );
}
