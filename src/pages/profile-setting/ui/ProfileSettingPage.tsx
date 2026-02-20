import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/entities/auth';
import { Button } from '@/shared/ui';

export const ProfileSettingPage = () => {
  const navigate = useNavigate();
  const { signInMutation } = useAuth();

  const onClick = () => {
    // TODO: 임시 로그인
    signInMutation.mutate({ user: { email: 'test@test.com', password: '11111111' } });
    navigate('/feed');
  };

  return <Button onClick={onClick}>알약마켓 시작하기</Button>;
};
