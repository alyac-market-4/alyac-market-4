import { useMemo, useState } from 'react';

import { uploadImage } from '../assets';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

interface ProfileAvatarProps {
  src?: string | null;
  alt: string;
  size?: 'default' | 'sm' | 'lg' | 'xl';
}

export const ProfileAvatar = ({ src, alt, size = 'default' }: ProfileAvatarProps) => {
  const initial = useMemo(() => (src?.trim() ? src : uploadImage), [src]);
  const [imgSrc, setImgSrc] = useState<string>(initial);

  return (
    <Avatar size={size}>
      <AvatarImage
        alt={alt}
        src={imgSrc}
        onError={() => {
          // 이미지 링크가 깨지거나 로딩 실패하면 기본 알약으로
          setImgSrc(uploadImage);
        }}
      />
      <AvatarFallback>
        <img alt={alt} src={uploadImage} />
      </AvatarFallback>
    </Avatar>
  );
};
