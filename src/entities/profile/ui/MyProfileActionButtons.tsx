import { Button } from '@/shared/ui';

interface MyProfileActionButtonsProps {
  update: () => void;
  create: () => void;
}

export function MyProfileActionButtons({ update, create }: MyProfileActionButtonsProps) {
  return (
    <>
      <Button onClick={update} variant="outline" size="lg" className="flex-1" type="button">
        프로필 수정
      </Button>
      <Button onClick={create} variant="outline" size="lg" className="flex-1" type="button">
        상품 등록
      </Button>
    </>
  );
}
