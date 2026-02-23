import { Avatar, AvatarFallback, AvatarImage } from './avatar';

interface ProfileAvatarProps {
  src: string;
  alt: string;
  size?: 'default' | 'sm' | 'lg' | 'xl';
}

export const ProfileAvatar = ({ src, alt, size = 'default' }: ProfileAvatarProps) => {
  return (
    <Avatar size={size}>
      <AvatarImage alt={alt} src={src} />
      <AvatarFallback>
        <img alt={alt} src="https://placehold.co/96x96" />
      </AvatarFallback>
    </Avatar>
  );
};
