import { ProfileAvatar } from '@/shared/ui';

interface ProfileBadgeProps {
  username: string;
  accountname: string;
  image: string;
}

export const ProfileBadge = ({ username, accountname, image }: ProfileBadgeProps) => {
  return (
    <div className="flex items-center gap-3">
      <ProfileAvatar size="lg" src={image} alt={username} />
      <div className="flex flex-col">
        <span className="text-foreground font-semibold">{username}</span>
        <span className="text-muted-foreground text-sm">@{accountname}</span>
      </div>
    </div>
  );
};
