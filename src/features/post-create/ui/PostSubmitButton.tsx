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

export default PostSubmitButton;
