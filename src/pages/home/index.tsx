import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button onClick={() => navigate('/sign-in')}>로그인</Button>
      <Button onClick={() => navigate('/sign-up')}>회원가입</Button>
    </div>
  );
};
