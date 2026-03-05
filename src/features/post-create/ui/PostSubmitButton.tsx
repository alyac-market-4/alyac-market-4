// 게시물 업로드 실행(비활성화/스타일 포함)을 담당하는 제출 버튼 컴포넌트
import { Button } from '@/shared/ui';

type Props = {
  disabled: boolean;
  onClick: () => void;
};

export function PostSubmitButton({ disabled, onClick }: Props) {
  return (
    <Button
      type="button"
      disabled={disabled}
      onClick={onClick}
      variant="alyac"
      className="h-9 rounded-full px-4 text-sm font-medium"
    >
      업로드
    </Button>
  );
}
