import { useMemo } from 'react';

import { useNavigate } from 'react-router-dom';

import { useSearchUserQuery } from '@/entities/user/api/useUserQuery';
import { ProfileAvatar } from '@/shared/ui';

type Props = {
  keyword: string;
};

export const AccountSearchPanel = ({ keyword }: Props) => {
  const navigate = useNavigate();

  const trimmed = useMemo(() => keyword.trim(), [keyword]);
  const { data: users = [], isLoading, isError, refetch } = useSearchUserQuery(trimmed);

  return (
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
            <li key={u.accountname}>
              {/* ✅ 버튼으로 만들어 접근성/클릭 처리 */}
              <button
                type="button"
                className="flex w-full items-center gap-3 py-3 text-left"
                onClick={() => navigate(`/profile/${u.accountname}`)}
              >
                <ProfileAvatar size="default" src={u.image} alt={u.username} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{u.username}</p>
                  <p className="truncate text-xs opacity-60">@{u.accountname}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};
