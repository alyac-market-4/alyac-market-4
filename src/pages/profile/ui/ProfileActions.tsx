import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui';

export const ProfileActions = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-4 flex gap-2 px-20">
      <Button
        onClick={() => navigate('/profile-update')}
        variant="outline"
        size="lg"
        className="flex-1"
        type="button"
      >
        프로필 수정
      </Button>
      <Button
        onClick={() => navigate('/product/create')}
        variant="outline"
        size="lg"
        className="flex-1"
        type="button"
      >
        상품 등록
      </Button>
    </div>
  );
};
