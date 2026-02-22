import { useEffect, useRef } from 'react';

import { BackButton } from '@/shared/ui';

type Props = {
  keyword: string;
  onChangeKeyword: (value: string) => void;
};

export default function SearchInput({ keyword, onChangeKeyword }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex w-[calc(100vw-2rem)] items-center gap-3">
      <BackButton />

      <input
        ref={inputRef}
        className="bg-muted flex h-10 w-full rounded-full border px-4 py-2 text-sm focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-none"
        placeholder="계정 검색"
        value={keyword}
        onChange={(e) => onChangeKeyword(e.target.value)}
      />
    </div>
  );
}
