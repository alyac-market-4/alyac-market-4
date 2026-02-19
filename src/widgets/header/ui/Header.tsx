import type { ReactNode } from 'react';

import { Title } from '@/widgets/header/ui/Title';

interface HeaderProps {
  left?: ReactNode | string;
  right?: ReactNode | string;
}

export const Header = ({ left, right }: HeaderProps) => {
  const renderLeft = typeof left === 'string' ? <Title>{left}</Title> : left;
  const renderRight = typeof right === 'string' ? <Title>{right}</Title> : right;

  return (
    <header className="border-border bg-background sticky top-0 z-10 flex items-center justify-between border-b px-4 py-3">
      <div>{renderLeft}</div>
      <div>{renderRight}</div>
    </header>
  );
};
