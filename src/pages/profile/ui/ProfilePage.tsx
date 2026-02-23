import { useState } from 'react';

import { EllipsisVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { removeToken } from '@/shared/lib';
import { BackButton, Button, IconButton } from '@/shared/ui';
import { Header } from '@/widgets/header';
import { PostList } from '@/widgets/post-list';
import { ProductList } from '@/widgets/product-list';
import { ProfileCard } from '@/widgets/profile-card';

import type { ViewMode } from '../model/types';
import { LayoutController } from './LayoutController';
import { ProfileActions } from './ProfileActions';

export const ProfilePage = () => {
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState<ViewMode>('list');

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

      <Button onClick={onClick}>로그아웃</Button>

      <main className="flex-1 overflow-y-auto pb-16">
        <section className="border-border border-b px-4 py-6">
          <ProfileCard />
          <ProfileActions />
        </section>

        <ProductList />

        <section>
          <div className="border-border flex items-center justify-end border-b px-4 py-4">
            <LayoutController viewMode={viewMode} setViewMode={setViewMode} />
          </div>
          <div className="px-4 py-4">
            <PostList />
          </div>
        </section>
      </main>
    </>
  );
};
