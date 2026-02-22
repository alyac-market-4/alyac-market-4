import { ImageFileButton } from '@/shared/ui/ImageFileButton';

import { Avatar, AvatarFallback, AvatarImage } from './avatar';

interface ProfileAvatarProps {
  src: string;
  alt: string;
  size?: 'default' | 'sm' | 'lg' | 'xl';
}

export const ProfileAvatarEditor = ({ src, alt, size = 'default' }: ProfileAvatarProps) => {
  return (
    <div className="relative inline-block">
      <Avatar size={size}>
        <AvatarImage alt={alt} src={src} />
        <AvatarFallback>
          <img alt={alt} src={src} />
        </AvatarFallback>
      </Avatar>
      <ImageFileButton className="absolute right-0 bottom-0" />
    </div>
  );
};
