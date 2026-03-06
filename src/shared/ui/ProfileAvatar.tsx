import { useEffect, useMemo, useState } from 'react';

import { uploadImage } from '../assets';
import { imageUrl } from '../lib';
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from './avatar';

interface ProfileAvatarProps {
  src?: string | null;
  alt: string;
  size?: 'default' | 'sm' | 'lg' | 'xl';
  hasBadge?: boolean;
}

export const ProfileAvatar = ({
  src,
  alt,
  size = 'default',
  hasBadge = false,
}: ProfileAvatarProps) => {
  const initial = useMemo(() => {
    const trimmed = src?.trim();
    if (!trimmed) return uploadImage;
    return imageUrl(trimmed, uploadImage);
  }, [src]);

  const [imgSrc, setImgSrc] = useState<string>(initial);

  // src가 바뀔 때 imgSrc도 업데이트
  useEffect(() => {
    setImgSrc(initial);
  }, [initial]);

  return (
    <Avatar size={size}>
      <AvatarImage
        alt={alt}
        src={imgSrc}
        onError={() => {
          setImgSrc(uploadImage);
        }}
      />
      <AvatarFallback>
        <img alt={alt} src={uploadImage} />
      </AvatarFallback>
      {hasBadge && <AvatarBadge className="top-0 left-0 bg-green-600" />}
    </Avatar>
  );
};
