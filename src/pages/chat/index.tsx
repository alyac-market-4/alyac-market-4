import { EllipsisVertical } from 'lucide-react';

import { BackButton } from '@/shared/ui/BackButton';
import { IconButton } from '@/shared/ui/IconButton';
import { Header } from '@/widgets/header';

export const ChatPage = () => {
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
      <div>Chat</div>
    </>
  );
};
