import React from 'react';

import { Link } from 'react-router-dom';

import type { User } from '@/shared/model';
import { ProfileAvatar } from '@/shared/ui';

interface FriendCardProps {
  user: User;
  actionButton: React.ReactNode;
}

export function FriendCard({ user, actionButton }: FriendCardProps) {
  return (
    <div key={user.accountname} className="flex items-center gap-3 px-4 py-4">
      <Link to={`/profile/${user.accountname}`} className="flex-shrink-0">
        <ProfileAvatar src={user.image} alt={user.username} size="lg" />
      </Link>
      <div className="flex flex-1 flex-col items-start">
        <Link to={`/profile/${user.accountname}`} className="w-auto text-left">
          <p className="text-foreground truncate text-sm font-semibold">{user.username}</p>
          <p className="text-muted-foreground truncate text-xs">{user.intro}</p>
        </Link>
      </div>
      {actionButton}
    </div>
  );
}
