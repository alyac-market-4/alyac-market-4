import { useState } from 'react';

import SearchInput from '@/features/account-search/ui/SearchInput';
import { useDebouncedValue } from '@/shared/lib';
import { BackButton } from '@/shared/ui';
import { AccountSearchPanel } from '@/widgets/account-search';
import { Header } from '@/widgets/header';

export const AccountSearchPage = () => {
  const [keyword, setKeyword] = useState('');

  // ✅ 공백 제거 + 디바운스
  const debouncedKeyword = useDebouncedValue(keyword.trim(), 300);

  return (
    <>
      <Header
        left={<BackButton />}
        center={
          <SearchInput keyword={keyword} onChangeKeyword={setKeyword} withBackButton={false} />
        }
      />

      {/* ✅ 디바운스된 값만 패널로 */}
      <AccountSearchPanel keyword={debouncedKeyword} />
    </>
  );
};
