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
          // ✅ 헤더 폭을 "거의 전체"처럼 쓰게 만들기
          <div className="flex w-[calc(100vw-2rem)] items-center gap-3">
            <BackButton />

            {/* ✅ 가운데를 꽉 채우는 검색창 */}
            <input
              ref={inputRef}
              className="border-border bg-muted flex-1 rounded-full border px-4 py-2 text-sm outline-none"
              placeholder="계정 검색"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />

            {/* ✅ 오른쪽도 BackButton과 같은 폭 더미로 대칭 맞추기 */}
            <div className="w-10" />
          </div>
        }
        // ✅ Header가 justify-between이라 오른쪽에 공간을 남겨줘야 함
        right={<div className="w-10" />}
      />

      <main className="px-4 py-8">
        <div className="text-center text-sm opacity-60">계정을 검색해보세요.</div>
      </main>
    </>
  );
};
