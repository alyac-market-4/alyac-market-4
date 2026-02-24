import { MessageCircle } from 'lucide-react';

import { cn } from '@/shared/lib';

interface CommentButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  commentCount: number;
}

export const CommentButton = ({ commentCount, className, ...props }: CommentButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        'ring-offset-background focus-visible:ring-ring hover:text-accent-foreground inline-flex h-auto cursor-pointer items-center justify-center gap-1.5 rounded-md p-0 text-sm font-medium whitespace-nowrap transition-colors hover:bg-transparent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
        className,
      )}
    >
      <MessageCircle />
      <span className="text-muted-foreground text-sm">{commentCount}</span>
    </button>
  );
};
