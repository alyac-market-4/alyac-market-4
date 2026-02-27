import { useMemo, useState } from 'react';

import { accountSearchKeywordSchema } from '@/features/account-search/model/schemas';
import SearchInput from '@/features/account-search/ui/SearchInput';
import { useDebouncedValue } from '@/shared/lib';
import { BackButton } from '@/shared/ui';
import { AccountSearchPanel } from '@/widgets/account-search';
import { Header } from '@/widgets/header';

export const AccountSearchPage = () => {
  const [keyword, setKeyword] = useState('');

  // ✅ 입력 자체를 디바운스한 뒤, Zod로 trim + 검증
  const debouncedRaw = useDebouncedValue(keyword, 300);

  const { normalizedKeyword, keywordError } = useMemo(() => {
    // 빈 값은 “검색 전 상태”로 취급 (에러 표시 X)
    if (!debouncedRaw.trim()) {
      return { normalizedKeyword: '', keywordError: null as string | null };
    }

    const parsed = accountSearchKeywordSchema.safeParse(debouncedRaw);

    if (parsed.success) {
      return { normalizedKeyword: parsed.data, keywordError: null as string | null };
    }

    return {
      normalizedKeyword: '',
      keywordError: parsed.error.issues[0]?.message ?? '검색어가 올바르지 않습니다.',
    };
  }, [debouncedRaw]);

  return (
    <>
      <Header
        left={<BackButton />}
        center={
          <SearchInput keyword={keyword} onChangeKeyword={setKeyword} withBackButton={false} />
        }
      />

      <AccountSearchPanel keyword={normalizedKeyword} keywordError={keywordError} />
    </>
  );
};
