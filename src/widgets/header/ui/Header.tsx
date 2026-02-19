import type { ReactNode } from 'react';

type HeaderProps = {
  left?: ReactNode;
  right?: ReactNode;
  center?: ReactNode;
};

export const Header = ({ left, right, center }: HeaderProps) => {
  return (
    <header className="border-border bg-background sticky top-0 z-50 h-14 border-b">
      {/* ✅ max-w 제거: 전체 폭 사용 */}
      <div className="flex h-full w-full items-center gap-2 px-4">
        {/* Left */}
        <div className="flex min-w-0 flex-1 items-center">
          {typeof left === 'string' ? <h1 className="text-base font-semibold">{left}</h1> : left}
        </div>

        {/* Center */}
        {center ? (
          <div className="flex w-full flex-[2] items-center justify-center">{center}</div>
        ) : null}

        {/* Right */}
        <div className="flex flex-1 items-center justify-end">{right}</div>
      </div>
    </header>
  );
};
