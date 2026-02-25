import { ImagePlus } from 'lucide-react';

import { Button } from './button';

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
      className={`absolute rounded-full ${className ?? ''}`}
    >
      <ImagePlus className="size-5" />
    </Button>
  );
};
