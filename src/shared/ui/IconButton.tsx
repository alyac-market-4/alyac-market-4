import { forwardRef } from 'react';

import { Button } from './button';

interface IconButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Button ref={ref} variant="ghost" size="icon-lg" className={className} {...props}>
        {children}
      </Button>
    );
  },
);
