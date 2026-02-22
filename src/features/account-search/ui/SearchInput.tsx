import { useEffect, useRef, useState } from 'react';

import { BackButton } from '@/shared/ui';

export default function SearchInput() {
  const [keyword, setKeyword] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex w-[calc(100vw-2rem)] items-center gap-3">
      <BackButton />

      <input
        ref={inputRef}
        className="border-border bg-muted flex-1 rounded-full border px-4 py-2 text-sm outline-none"
        placeholder="계정 검색"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </div>
  );
}
