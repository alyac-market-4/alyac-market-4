import { useState } from 'react';

import SearchInput from '@/features/account-search/ui/SearchInput';
import { BackButton } from '@/shared/ui';
import { Header } from '@/widgets/header';

export const AccountSearchPage = () => {
  const [keyword, setKeyword] = useState('');

  return (
    <>
      {/* ✅ 검색창은 헤더 안에(예제처럼) */}
      <Header
        left={<BackButton />}
        center={
          <SearchInput keyword={keyword} onChangeKeyword={setKeyword} withBackButton={false} />
        }
      />

      <main className="flex h-[calc(100vh-64px)] flex-col px-4">
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center text-sm opacity-60">계정을 검색해보세요.</div>
        </div>
      </main>
    </>
  );
};
