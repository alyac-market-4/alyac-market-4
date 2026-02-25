import { ImageFileButton } from '@/shared/ui/ImageFileButton';
import { ProfileAvatar } from '@/shared/ui/ProfileAvatar';

interface ProfileAvatarProps {
  src?: string;
  alt: string;
  size?: 'default' | 'sm' | 'lg' | 'xl';
}

export const ProfileAvatarEditor = ({ src, alt, size = 'xl' }: ProfileAvatarProps) => {
  return (
    <div className="relative inline-block">
      <ProfileAvatar src={src} alt={alt} size={size} />
      <ImageFileButton className="absolute right-0 bottom-0 bg-[var(--main-button)] hover:bg-[var(--main-button-hover)]" />
    </div>
  );
};
