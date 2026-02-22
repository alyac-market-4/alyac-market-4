import { useState } from 'react';

import SearchInput from '@/features/account-search/ui/SearchInput';
import { Header } from '@/widgets/header';

export const AccountSearchPage = () => {
  const [keyword, setKeyword] = useState('');

  return (
    <>
      <Header left={<SearchInput keyword={keyword} onChangeKeyword={setKeyword} />} />

      <main className="px-4 py-8">
        <div className="text-center text-sm opacity-60">계정을 검색해보세요.</div>
      </main>
    </>
  );
};
