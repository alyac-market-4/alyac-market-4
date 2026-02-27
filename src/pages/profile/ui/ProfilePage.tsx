import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { useAuth } from '@/entities/auth';
import { useUserProfileQuery } from '@/entities/profile';
import { LayoutController } from '@/features/layout-controller';
import type { ViewMode } from '@/features/layout-controller';
import { ProfileActions } from '@/features/profile-actions';
import { getTokenUserInfo, themeIcons, useThemeStore } from '@/shared/lib';
import { BackButton, ErrorView, KebabMenu, LoadingState } from '@/shared/ui';
import { Header } from '@/widgets/header';
import { PostList } from '@/widgets/post-list';
import { ProductList } from '@/widgets/product-list';
import { ProfileCard } from '@/widgets/profile-card';

export const ProfilePage = () => {
  const { accountname } = useParams();
  const myAccountname = getTokenUserInfo().accountname;
  const isMe = !accountname || accountname === myAccountname;
  const targetAccountname = isMe ? myAccountname : accountname;
  const { data: user, isLoading, isError, refetch } = useUserProfileQuery(targetAccountname);
  const { logout } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const { theme, switchTheme } = useThemeStore();

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
        {isLoading ? (
          <LoadingState />
        ) : isError || !user ? (
          <ErrorView message="프로필 불러오기 실패" onRetry={() => refetch()} />
        ) : (
          <>
            <section className="border-border border-b px-4 py-6">
              <ProfileCard user={user} />
              <ProfileActions isMe={isMe} user={user} />
            </section>

            <ProductList />

            <section>
              <div className="border-border flex items-center justify-end border-b px-4 py-4">
                <LayoutController viewMode={viewMode} setViewMode={setViewMode} />
              </div>
              <div className="px-4">
                <PostList viewMode={viewMode} user={user} />
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
};
