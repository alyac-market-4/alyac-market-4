import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { useAuth } from '@/entities/auth';
import { useUserProfile } from '@/entities/profile';
import { type ViewMode } from '@/features/layout-controller';
import { ProfileActions } from '@/features/profile-actions';
import { getTokenUserInfo, themeIcons, useConfirmDialogStore, useThemeStore } from '@/shared/lib';
import { BackButton, ErrorView, KebabMenu } from '@/shared/ui';
import { Header } from '@/widgets/header';
import { PostList } from '@/widgets/post-list';
import { ProductList } from '@/widgets/product-list';
import { ProfileCard } from '@/widgets/profile-card';

import { ProfilePageSkeleton } from './ProfilePageSkeleton';

export const ProfilePage = () => {
  const { accountname } = useParams();
  const myAccountname = getTokenUserInfo()?.accountname || '';
  const isMe = !accountname || accountname === myAccountname;
  const targetAccountname = isMe ? myAccountname : accountname;
  const { data: user, isLoading, isError, refetch } = useUserProfile(targetAccountname);
  const { logout } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const { theme, switchTheme } = useThemeStore();
  const { openConfirm } = useConfirmDialogStore();

  if (isLoading) return <ProfilePageSkeleton viewMode={viewMode} setViewMode={setViewMode} />;
  if (isError) return <ErrorView message="프로필 불러오기 실패" onRetry={() => refetch()} />;
  if (!user) return null;

  return (
    <>
      <Header
        left={<BackButton />}
        right={
          <KebabMenu
            items={[
              { label: '설정 및 개인정보', onClick: () => {} },
              { label: '테마:', icon: themeIcons[theme], onClick: () => switchTheme() },
              {
                label: '로그아웃',
                onClick: () =>
                  openConfirm({
                    title: '로그아웃 하시겠습니까?',
                    actionText: '로그아웃',
                    onConfirm: () => {
                      logout();
                    },
                  }),
              },
            ]}
          />
        }
      />

      <main className="flex-1 overflow-y-auto pb-16">
        <section className="border-border border-b px-4 py-6">
          <ProfileCard isMe={isMe} user={user} />
          <ProfileActions isMe={isMe} user={user} />
        </section>

        <ProductList isMe={isMe} user={user} />

        <section className="px-4">
          <PostList viewMode={viewMode} setViewMode={setViewMode} user={user} />
        </section>
      </main>
    </>
  );
};
