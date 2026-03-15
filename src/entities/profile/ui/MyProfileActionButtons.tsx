import { Button } from '@/shared/ui';

interface MyProfileActionButtonsProps {
  update: () => void;
  create: () => void;
}

export function MyProfileActionButtons({ update, create }: MyProfileActionButtonsProps) {
  return (
    <div className="flex justify-center gap-5 px-20">
      <Button
        onClick={update}
        variant="outline"
        size="lg"
        className="max-w-80 flex-1 rounded-full"
        type="button"
      >
        프로필 수정
      </Button>
      <Button
        onClick={create}
        variant="outline"
        size="lg"
        className="max-w-80 flex-1 rounded-full"
        type="button"
      >
        상품 등록
      </Button>
    </div>
  );
}
