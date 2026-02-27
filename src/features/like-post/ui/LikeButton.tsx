import { Heart } from 'lucide-react';

import { usePostMutation } from '@/entities/post';
import { cn } from '@/shared/lib';

interface LikeButtonProps {
  postId: string;
  heartCount: number;
  hearted: boolean;
}

export const LikeButton = ({ postId, heartCount, hearted }: LikeButtonProps) => {
  const { toggleLikeMutation } = usePostMutation();

  return (
    <button
      onClick={() => toggleLikeMutation.mutate(postId)}
      className={cn(
        'ring-offset-background focus-visible:ring-ring hover:text-accent-foreground inline-flex h-auto cursor-pointer items-center justify-center gap-1.5 rounded-md p-0 text-sm font-medium whitespace-nowrap transition-colors hover:bg-transparent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0',
        hearted ? 'text-red-500' : '',
      )}
      type="button"
    >
      <Heart className={cn(hearted && 'fill-current')} />
      <span className="text-muted-foreground text-sm">{heartCount}</span>
    </button>
  );
};
