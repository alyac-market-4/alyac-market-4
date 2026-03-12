import { useNavigate } from 'react-router-dom';

import { fullLogoAlyac404 } from '@/shared/assets';
import { Button } from '@/shared/ui';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const returnToPreviousPage = () => {
    navigate(-1);
  };

  return (
    <div className="bg-background flex h-screen flex-col items-center justify-center gap-5">
      <img src={fullLogoAlyac404} alt="404 알약 이미지" className="h-[197px] w-[97px]" />
      <div className="text-muted-foreground text-base">페이지를 찾을 수 없습니다. :(</div>
      <Button
        variant="alyac"
        className="inline-block h-[44px] w-[120px]"
        onClick={returnToPreviousPage}
      >
        이전 페이지
      </Button>
    </div>
  );
};
