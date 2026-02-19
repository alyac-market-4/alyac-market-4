import { Button } from '@/shared/ui';

export const IconButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <Button variant="ghost" size="icon-lg" onClick={onClick}>
      {children}
    </Button>
  );
};
