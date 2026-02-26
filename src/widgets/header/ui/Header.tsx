import type { ReactNode } from 'react';

import { Title } from './Title';

interface HeaderProps {
  left?: ReactNode | string;
  center?: ReactNode | string;
  right?: ReactNode | string;
}

export const Header = ({ left, center, right }: HeaderProps) => {
  const renderLeft = typeof left === 'string' ? <Title>{left}</Title> : left;
  const renderCenter = typeof center === 'string' ? <Title>{center}</Title> : center;
  const renderRight = typeof right === 'string' ? <Title>{right}</Title> : right;

  return (
    <header className="border-border bg-background sticky top-0 z-10 flex h-16 items-center gap-3 border-b px-4">
      <div className="shrink-0">{renderLeft}</div>
      <div className="min-w-0 flex-1">{renderCenter}</div>
      <div className="shrink-0">{renderRight}</div>
    </header>
  );
};
