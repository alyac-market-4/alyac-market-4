import { ImagePlus } from 'lucide-react';

import { Button } from './button';

type ImageFileButtonProps = {
  // (e: React.MouseEvent<HTMLButtonElement>) => void
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export const ImageFileButton = ({ onClick, className, style }: ImageFileButtonProps) => {
  return (
    <Button
      type="button"
      size="icon"
      onClick={onClick}
      style={style}
      className={`absolute rounded-full ${className ?? ''}`}
    >
      <ImagePlus className="size-5" />
    </Button>
  );
};
