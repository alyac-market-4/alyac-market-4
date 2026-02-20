import { useEffect, useRef, useState } from 'react';

import { BackButton } from '@/shared/ui/BackButton';
import { Header } from '@/widgets/header';

export const AccountSearchPage = () => {
  const [keyword, setKeyword] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <Header
        left={
          <div className="flex w-[calc(100vw-2rem)] items-center gap-3">
            <BackButton />

            <input
              ref={inputRef}
              className="border-border bg-muted flex-1 rounded-full border px-4 py-2 text-sm outline-none"
              placeholder="계정 검색"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />

            <div className="w-10" />
          </div>
        }
        right={<div className="w-10" />}
      />

      <main className="px-4 py-8">
        <div className="text-center text-sm opacity-60">계정을 검색해보세요.</div>
      </main>
    </>
  );
};
