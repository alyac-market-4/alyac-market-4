import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/');
  };
  const onClick2 = () => {
    navigate('-1');
  };

  return (
    <div>
      <div>404 Not Found</div>
      <Button onClick={onClick}>홈으로</Button>
      <Button onClick={onClick2}>이전으로</Button>
    </div>
  );
};
