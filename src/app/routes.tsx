import { createBrowserRouter } from 'react-router-dom';

import { RequireAuth } from '@/entities/auth';
import { RequireGuest } from '@/entities/auth';
import { RequireSignUpFormData } from '@/entities/auth';

import { MainLayout } from './layouts/MainLayout';
import { ScrollManager } from './layouts/ScrollManager';
import {
  AccountSearchPage,
  ChatDetailPage,
  ChatPage,
  FeedPage,
  FollowPage,
  HomePage,
  NotFoundPage,
  PostCreatePage,
  PostDetailPage,
  PostUpdatePage,
  ProductCreatePage,
  ProductUpdatePage,
  ProfilePage,
  ProfileSettingPage,
  ProfileUpdatePage,
  SignInPage,
  SignUpPage,
} from './lazyPages';

export const router = createBrowserRouter([
  {
    element: <ScrollManager />,
    children: [
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
    ],
  },
]);
