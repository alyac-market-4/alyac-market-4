import { lazy } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '@/app/layouts/MainLayout';
import { RequireAuth } from '@/entities/auth';
import { RequireGuest } from '@/entities/auth';

const HomePage = lazy(() => import('@/pages/home').then((m) => ({ default: m.HomePage })));
const FeedPage = lazy(() => import('@/pages/feed').then((m) => ({ default: m.FeedPage })));
const ChatPage = lazy(() => import('@/pages/chat').then((m) => ({ default: m.ChatPage })));
const ProfilePage = lazy(() => import('@/pages/profile').then((m) => ({ default: m.ProfilePage })));
const SignInPage = lazy(() => import('@/pages/sign-in').then((m) => ({ default: m.SignInPage })));
const SignUpPage = lazy(() => import('@/pages/sign-up').then((m) => ({ default: m.SignUpPage })));
const PostCreatePage = lazy(() =>
  import('@/pages/post-create').then((m) => ({ default: m.PostCreatePage })),
);
const NotFoundPage = lazy(() =>
  import('@/pages/not-found').then((m) => ({ default: m.NotFoundPage })),
);

export const router = createBrowserRouter([
  {
    // MainLayout
    path: '/',
    element: <MainLayout />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: 'feed', element: <FeedPage /> },
          { path: 'chat', element: <ChatPage /> },
          { path: 'profile', element: <ProfilePage /> },
        ],
      },
    ],
  },
  {
    // 레이아웃 없음
    path: '/',
    children: [
      { index: true, element: <HomePage /> },
      {
        path: '',
        element: <RequireAuth />,
        children: [{ path: 'post-create', element: <PostCreatePage /> }],
      },
      {
        element: <RequireGuest />,
        children: [
          { path: 'sign-in', element: <SignInPage /> },
          { path: 'sign-up', element: <SignUpPage /> },
        ],
      },
    ],
  },
  // 404 페이지
  { path: '*', element: <NotFoundPage /> },
]);
