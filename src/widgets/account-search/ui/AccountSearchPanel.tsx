// 검색어 상태(에러/빈값/로딩/실패/결과)를 분기하고 검색 결과 리스트 및 프로필 이동을 처리하는 패널
import { useNavigate } from 'react-router-dom';

import { useSearchUser } from '@/entities/user';
import { useDebounce } from '@/shared/lib/useDebounce';
import { ProfileAvatar } from '@/shared/ui';

type Props = {
  keyword: string;
  keywordError?: string | null;
};

const CENTER_AREA_CLASS =
  'flex h-[calc(100vh-160px)] items-center justify-center text-center text-sm';

const MutedCenterMessage = ({ children }: { children: React.ReactNode }) => (
  <div className={`${CENTER_AREA_CLASS} opacity-60`}>{children}</div>
);

const ErrorMessage = ({ children }: { children: React.ReactNode }) => (
  <div className="py-8 text-center text-sm text-red-500">{children}</div>
);

export const AccountSearchPanel = ({ keyword, keywordError }: Props) => {
  const navigate = useNavigate();

  // 입력값 정리 + 디바운스 적용
  const trimmed = keyword.trim();
  const debouncedKeyword = useDebounce(trimmed, 400);

  // 디바운스된 값으로 검색
  const { data: users = [], isLoading, isError, refetch } = useSearchUser(debouncedKeyword);

  const renderBody = () => {
    // 입력 검증 에러는 최우선 표시
    if (keywordError) return <ErrorMessage>{keywordError}</ErrorMessage>;

    // 아무것도 입력 안 했을 때
    if (!trimmed) {
      return <MutedCenterMessage>계정을 검색해보세요.</MutedCenterMessage>;
    }

    // 디바운스 대기 중 OR 실제 API 로딩 중이면 바로 "검색 중..."
    const isDebouncing = trimmed !== debouncedKeyword;
    if (isDebouncing || isLoading) {
      return <MutedCenterMessage>검색 중...</MutedCenterMessage>;
    }

    // 네트워크/서버 에러 (가운데 정렬)
    if (isError) {
      return (
        <div className={CENTER_AREA_CLASS}>
          <div>
            <p className="opacity-60">검색 실패</p>
            <button className="mt-2 underline" type="button" onClick={() => refetch()}>
              다시 시도
            </button>
          </div>
        </div>
      );
    }

    // 검색 결과가 0명
    if (users.length === 0) {
      return <MutedCenterMessage>검색 결과가 없어요.</MutedCenterMessage>;
    }

    // 검색 결과 리스트
    return (
      <ul className="flex flex-col divide-y">
        {users.map((u) => (
          <li key={u.accountname}>
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
    );
  };

  return <main className="px-4 py-4">{renderBody()}</main>;
};
