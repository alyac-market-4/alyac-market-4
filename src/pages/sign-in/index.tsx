import { useNavigate } from 'react-router-dom';

import { saveToken } from '@/shared/lib';
import { Button } from '@/shared/ui';

export const SignInPage = () => {
  const navigate = useNavigate();

  const onClick = () => {
    // TODO: 임시 토큰을 실제 로그인 API 호출로 변경
    saveToken('1', '1');
    navigate('/feed');
  };

  return <Button onClick={onClick}>로그인</Button>;
};
