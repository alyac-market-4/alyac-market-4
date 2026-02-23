import { useState } from 'react';

import { EllipsisVertical, Monitor, Moon, Sun } from 'lucide-react';

import { useAuth } from '@/entities/auth';
import { useTheme } from '@/shared/lib/theme/useTheme';
import { BackButton, Button, IconButton } from '@/shared/ui';
import { KebabMenu } from '@/shared/ui/KebabMenu';
import { Header } from '@/widgets/header';
import { PostList } from '@/widgets/post-list';
import { ProductList } from '@/widgets/product-list';
import { ProfileCard } from '@/widgets/profile-card';

import type { ViewMode } from '../model/types';
import { LayoutController } from './LayoutController';
import { ProfileActions } from './ProfileActions';

const themeIcons = {
  system: <Monitor />,
  light: <Sun />,
  dark: <Moon />,
};

export const ProfilePage = () => {
  const { logout } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const { theme, switchTheme } = useTheme();

  return (
    <>
      <Header
        left={<BackButton />}
        right={
          <KebabMenu
            items={[
              { label: '설정 및 개인정보', onClick: () => {} },
              { label: '테마:', icon: themeIcons[theme], onClick: () => switchTheme() },
              { label: '로그아웃', onClick: logout },
            ]}
          />
        }
      />

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
