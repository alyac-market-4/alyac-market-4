import { useMemo, useState } from 'react';

import { useSearchUserQuery } from '@/entities/user/api/useUserQuery';
import SearchInput from '@/features/account-search/ui/SearchInput';
import { ProfileAvatar } from '@/shared/ui';

export const AccountSearchPanel = () => {
  const [keyword, setKeyword] = useState('');

  const trimmed = useMemo(() => keyword.trim(), [keyword]);

  const { data: users = [], isLoading, isError, refetch } = useSearchUserQuery(trimmed);

  return (
    <>
      {/* 헤더 영역에서 쓸 input */}
      <div className="px-4 pt-3">
        <SearchInput keyword={keyword} onChangeKeyword={setKeyword} />
      </div>

      <main className="px-4 py-4">
        {!trimmed ? (
          <div className="flex h-[calc(100vh-160px)] items-center justify-center text-center text-sm opacity-60">
            계정을 검색해보세요.
          </div>
        ) : isLoading ? (
          <div className="py-8 text-center text-sm opacity-60">검색 중...</div>
        ) : isError ? (
          <div className="py-8 text-center text-sm">
            검색 실패{' '}
            <button className="underline" type="button" onClick={() => refetch()}>
              다시 시도
            </button>
          </div>
        ) : users.length === 0 ? (
          <div className="py-8 text-center text-sm opacity-60">검색 결과가 없어요.</div>
        ) : (
          <ul className="flex flex-col divide-y">
            {users.map((u) => (
              <li key={u.accountname} className="flex items-center gap-3 py-3">
                <ProfileAvatar size="md" src={u.image} alt={u.username} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{u.username}</p>
                  <p className="truncate text-xs opacity-60">@{u.accountname}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
};
