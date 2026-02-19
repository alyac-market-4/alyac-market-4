import type { ReactNode } from 'react';

import { Link } from 'react-router-dom';

import { cn } from '@/shared/lib/utils';
import { buttonVariants } from '@/shared/ui';

interface NavItemProps {
  to: string;
  icon: ReactNode;
  label: string;
  isActive?: boolean;
}

export const NavItem = ({ to, icon, label, isActive }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        'flex flex-col items-center justify-center gap-1 p-2',
        buttonVariants({ variant: 'ghost', size: 'icon-lg' }),
        'h-auto w-auto rounded-md hover:text-current',
        isActive && 'text-primary',
      )}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </Link>
  );
};
