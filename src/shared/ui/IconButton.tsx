import { Button } from '@/shared/ui';

export const IconButton = ({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <Button variant="ghost" size="icon-lg" onClick={onClick} className={className}>
      {children}
    </Button>
  );
};
