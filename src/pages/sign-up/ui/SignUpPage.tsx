import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui';

export const SignUpPage = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/profile-setting');
  };

  return <Button onClick={onClick}>회원가입</Button>;
};
