import { useState } from 'react';

import SearchInput from '@/features/account-search/ui/SearchInput';
import { BackButton } from '@/shared/ui';
import { AccountSearchPanel } from '@/widgets/account-search';
import { Header } from '@/widgets/header';

export const AccountSearchPage = () => {
  const [keyword, setKeyword] = useState('');

  return (
    <>
      <Header
        left={<BackButton />}
        center={
          <SearchInput keyword={keyword} onChangeKeyword={setKeyword} withBackButton={false} />
        }
      />

      <AccountSearchPanel keyword={keyword} />
    </>
  );
};
