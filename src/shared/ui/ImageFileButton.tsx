import { Image } from 'lucide-react';

import { Button } from '@/shared/ui';

type ImageFileButtonProps = {
  // (e: React.MouseEvent<HTMLButtonElement>) => void
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

export const ImageFileButton = ({ onClick, className }: ImageFileButtonProps) => {
  return (
    <Button
      type="button"
      size="icon"
      onClick={onClick}
      className={`absolute right-4 bottom-4 rounded-full ${className ?? ''}`}
    >
      <Image className="size-5" />
    </Button>
  );
};
