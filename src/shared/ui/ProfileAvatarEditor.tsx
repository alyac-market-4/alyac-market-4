import { ImageFileButton, type ImageFileButtonProps } from '@/shared/ui';
import { ProfileAvatar } from '@/shared/ui/ProfileAvatar';

interface ProfileAvatarProps {
  src?: string;
  alt: string;
  size?: 'default' | 'sm' | 'lg' | 'xl';
  imageFileButtonProps: ImageFileButtonProps;
}

export const ProfileAvatarEditor = ({
  src,
  alt,
  size = 'xl',
  imageFileButtonProps,
}: ProfileAvatarProps) => {
  return (
    <div className="relative inline-block">
      <ProfileAvatar src={src} alt={alt} size={size} />
      <ImageFileButton
        {...imageFileButtonProps}
        className="absolute right-0 bottom-0 bg-[var(--main-button)] hover:bg-[var(--main-button-hover)]"
      />
    </div>
  );
};
