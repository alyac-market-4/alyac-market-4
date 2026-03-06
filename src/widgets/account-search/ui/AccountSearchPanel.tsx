// 검색어 상태(에러/빈값/로딩/실패/결과)를 분기하고 검색 결과 리스트 및 프로필 이동을 처리하는 패널
// 페이지 이동을 위한 React Router 훅
import { useNavigate } from 'react-router-dom';

// 사용자 검색 API 훅
import { useSearchUser } from '@/entities/user';
// 입력값 변경 시 일정 시간 후에 값을 반영하는 debounce 훅
import { useDebounce } from '@/shared/lib/useDebounce';
// 사용자 프로필 이미지 표시 컴포넌트
import { ProfileAvatar } from '@/shared/ui';

type Props = {
  keyword: string;
  keywordError?: string | null;
};

// 검색 안내 메시지를 화면 중앙에 표시하기 위한 공통 스타일
const CENTER_AREA_CLASS =
  'flex h-[calc(100vh-160px)] items-center justify-center text-center text-sm';

// 안내 메시지를 중앙에 표시하는 컴포넌트
const MutedCenterMessage = ({ children }: { children: React.ReactNode }) => (
  <div className={`${CENTER_AREA_CLASS} opacity-60`}>{children}</div>
);

// 에러 메시지를 표시하는 컴포넌트
const ErrorMessage = ({ children }: { children: React.ReactNode }) => (
  <div className="py-8 text-center text-sm text-red-500">{children}</div>
);

export const AccountSearchPanel = ({ keyword, keywordError }: Props) => {
  // 프로필 페이지 이동을 위한 네비게이션
  const navigate = useNavigate();

  // 입력값 공백 제거 후 debounce 적용
  const trimmed = keyword.trim();
  const debouncedKeyword = useDebounce(trimmed, 400);

  // debounce된 검색어로 사용자 검색
  const { data: users = [], isLoading, isError, refetch } = useSearchUser(debouncedKeyword);

  // 검색 상태에 따라 화면 내용을 분기 렌더링
  const renderBody = () => {
    // 입력값 검증 에러 표시
    if (keywordError) return <ErrorMessage>{keywordError}</ErrorMessage>;

    // 검색어가 없을 때 안내 메시지
    if (!trimmed) {
      return <MutedCenterMessage>계정을 검색해보세요.</MutedCenterMessage>;
    }

    // debounce 대기 중이거나 API 요청 중이면 로딩 메시지
    const isDebouncing = trimmed !== debouncedKeyword;
    if (isDebouncing || isLoading) {
      return <MutedCenterMessage>검색 중...</MutedCenterMessage>;
    }

    // 서버 또는 네트워크 에러 처리
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

    // 검색 결과가 없는 경우
    if (users.length === 0) {
      return <MutedCenterMessage>검색 결과가 없어요.</MutedCenterMessage>;
    }

    // 검색 결과 사용자 리스트 표시
    return (
      <ul className="flex flex-col divide-y">
        {users.map((u) => (
          <li key={u.accountname}>
            <button
              type="button"
              className="flex w-full cursor-pointer items-center gap-3 rounded-md py-3 text-left transition-colors hover:bg-gray-100"
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

  // 검색 패널 UI 렌더링
  return <main className="px-4 py-4">{renderBody()}</main>;
};
