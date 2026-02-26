import { useEffect, useRef } from 'react';

import { BackButton } from '@/shared/ui';

type Props = {
  keyword: string;
  onChangeKeyword: (value: string) => void;
  /** 헤더에서 BackButton을 따로 렌더할 때 false로 설정 */
  withBackButton?: boolean;
};

export default function SearchInput({ keyword, onChangeKeyword, withBackButton = true }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex w-full items-center gap-3">
      {withBackButton && <BackButton />}

      <input
        ref={inputRef}
        className="bg-muted flex h-10 flex-1 rounded-full border px-4 py-2 text-sm focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-none"
        placeholder="계정 검색"
        value={keyword}
        onChange={(e) => onChangeKeyword(e.target.value)}
      />
    </div>
  );
}
