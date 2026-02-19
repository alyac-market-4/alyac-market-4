import { useState } from 'react';

import { BackButton } from '@/shared/ui/BackButton';
import { Header } from '@/widgets/header';

export const AccountSearchPage = () => {
  const [keyword, setKeyword] = useState('');

  return (
    <>
      <Header
        left={
          <div className="flex w-full items-center gap-3">
            <BackButton />
            <input
              className="border-border bg-muted w-full rounded-full border px-4 py-2 text-sm outline-none"
              placeholder="계정 검색"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        }
        right={<div className="w-8" />} // ✅ 오른쪽 공간 확보(정렬 유지)
      />

      <main className="px-4 py-8">
        <div className="text-center text-sm opacity-60">계정을 검색해보세요.</div>
      </main>
    </>
  );
};
