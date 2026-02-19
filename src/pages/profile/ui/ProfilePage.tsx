import { EllipsisVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { removeToken } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { BackButton } from '@/shared/ui/BackButton';
import { IconButton } from '@/shared/ui/IconButton';
import { Header } from '@/widgets/header';

export const ProfilePage = () => {
  const navigate = useNavigate();

  const onClick = () => {
    removeToken();
    navigate('/');
  };

  return (
    <>
      <Header
        left={<BackButton />}
        right={
          <IconButton>
            <EllipsisVertical />
          </IconButton>
        }
      />
      <div>
        <Button onClick={onClick}>로그아웃</Button>
      </div>
    </>
  );
};
