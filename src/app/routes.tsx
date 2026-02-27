import { lazy } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { RequireAuth } from '@/entities/auth';
import { RequireGuest } from '@/entities/auth';
import { RequireSignUpFormData } from '@/entities/auth';

import { MainLayout } from './layouts/MainLayout';

const HomePage = lazy(() => import('@/pages/home').then((m) => ({ default: m.HomePage })));
const FeedPage = lazy(() => import('@/pages/feed').then((m) => ({ default: m.FeedPage })));
const AccountSearchPage = lazy(() =>
  import('@/pages/account-search').then((m) => ({ default: m.AccountSearchPage })),
);
const ChatPage = lazy(() => import('@/pages/chat').then((m) => ({ default: m.ChatPage })));
const ChatDetailPage = lazy(() =>
  import('@/pages/chat-detail').then((m) => ({ default: m.ChatDetailPage })),
);
const ProfilePage = lazy(() => import('@/pages/profile').then((m) => ({ default: m.ProfilePage })));
const ProductCreatePage = lazy(() =>
  import('@/pages/product-create').then((m) => ({ default: m.ProductCreatePage })),
);
const ProductUpdatePage = lazy(() =>
  import('@/pages/product-update').then((m) => ({ default: m.ProductUpdatePage })),
);
const ProfileUpdatePage = lazy(() =>
  import('@/pages/profile-update').then((m) => ({ default: m.ProfileUpdatePage })),
);
const FollowPage = lazy(() => import('@/pages/follow').then((m) => ({ default: m.FollowPage })));
const PostDetailPage = lazy(() =>
  import('@/pages/post-detail').then((m) => ({ default: m.PostDetailPage })),
);
const SignInPage = lazy(() => import('@/pages/sign-in').then((m) => ({ default: m.SignInPage })));
const SignUpPage = lazy(() => import('@/pages/sign-up').then((m) => ({ default: m.SignUpPage })));
const ProfileSettingPage = lazy(() =>
  import('@/pages/profile-setting').then((m) => ({ default: m.ProfileSettingPage })),
);
const PostCreatePage = lazy(() =>
  import('@/pages/post-create').then((m) => ({ default: m.PostCreatePage })),
);
const PostUpdatePage = lazy(() =>
  import('@/pages/post-update').then((m) => ({ default: m.PostUpdatePage })),
);
const NotFoundPage = lazy(() =>
  import('@/pages/not-found').then((m) => ({ default: m.NotFoundPage })),
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth />,
    children: [
      {
        children: [
          {
            element: <MainLayout />,
            children: [
              { path: 'feed', element: <FeedPage /> },
              { path: 'feed/search', element: <AccountSearchPage /> },
              { path: 'chat', element: <ChatPage /> },
              { path: 'profile', element: <ProfilePage /> },
              { path: 'profile/:accountname', element: <ProfilePage /> },
              { path: 'followers/:accountname', element: <FollowPage /> },
              { path: 'followings/:accountname', element: <FollowPage /> },
            ],
          },

          { path: 'chat/:chatId', element: <ChatDetailPage /> },
          { path: 'post-create', element: <PostCreatePage /> },
          { path: 'post-update/:postId', element: <PostUpdatePage /> },
          { path: 'product-create', element: <ProductCreatePage /> },
          { path: 'product-update/:productId', element: <ProductUpdatePage /> },
          { path: 'profile-update', element: <ProfileUpdatePage /> },
          { path: 'post/:postId', element: <PostDetailPage /> },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <RequireGuest />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'sign-in', element: <SignInPage /> },
      { path: 'sign-up', element: <SignUpPage /> },
      {
        element: <RequireSignUpFormData />,
        children: [{ path: 'profile-setting', element: <ProfileSettingPage /> }],
      },
    ],
  },
  // 404 페이지
  { path: '*', element: <NotFoundPage /> },
]);
