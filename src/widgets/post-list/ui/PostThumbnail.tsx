import { ImageOff } from 'lucide-react';
import { Link } from 'react-router-dom';

import { imageUrl } from '@/shared/lib/imageUrl';

interface PostThumbnailProps {
  image: string;
  to: string;
}

export const PostThumbnail = ({ image, to }: PostThumbnailProps) => {
  const thumbnail = imageUrl(image);

  return (
    <Link className="aspect-square cursor-pointer overflow-hidden" to={to}>
      {thumbnail ? (
        <img alt="Post content" className="h-full w-full object-cover" src={thumbnail} />
      ) : (
        <div className="bg-muted flex h-full w-full flex-col items-center justify-center gap-1">
          <ImageOff className="text-muted-foreground" />
          <span className="text-muted-foreground text-xs">이미지 없음</span>
        </div>
      )}
    </Link>
  );
};
