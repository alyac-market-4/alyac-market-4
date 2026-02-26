import { Button } from '@/shared/ui';

interface FormSubmitButtonProps {
  label: string; // 버튼 기본 텍스트 (로그인, 다음, 알약마켓 시작하기)
  pendingLabel?: string; // 로딩 중일 때 텍스트 (로그인 중..., 처리 중... 등)
  isPending: boolean; // Mutation의 로딩 상태
  isValid: boolean; // Form의 유효성 상태 (유효성 검사 통과 여부)
}

export const FormSubmitButton = ({
  label,
  pendingLabel,
  isPending,
  isValid,
}: FormSubmitButtonProps) => {
  return (
    <Button variant="alyac" size="lgbtn" type="submit" disabled={!isValid || isPending}>
      {isPending ? (pendingLabel ?? label) : label}
    </Button>
  );
};
