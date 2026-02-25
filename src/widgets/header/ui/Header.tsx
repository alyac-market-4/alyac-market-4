import type { ReactNode } from 'react';

import { Title } from './Title';

interface HeaderProps {
  left?: ReactNode | string;
  right?: ReactNode | string;
}

export const Header = ({ left, right }: HeaderProps) => {
  const renderLeft = typeof left === 'string' ? <Title>{left}</Title> : left;
  const renderRight = typeof right === 'string' ? <Title>{right}</Title> : right;

  return (
    <header className="border-border bg-background sticky top-0 z-10 flex h-16 items-center justify-between border-b px-4">
      <div>{renderLeft}</div>
      <div>{renderRight}</div>
    </header>
  );
};
