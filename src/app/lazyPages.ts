import { lazy } from 'react';

const lazyPage = <T extends Record<K, React.ComponentType<unknown>>, K extends keyof T>(
  importFn: () => Promise<T>,
  name: K,
) => lazy(() => importFn().then((m) => ({ default: m[name] })));

const HomePage = lazyPage(() => import('@/pages/home'), 'HomePage');
const FeedPage = lazyPage(() => import('@/pages/feed'), 'FeedPage');
const AccountSearchPage = lazyPage(() => import('@/pages/account-search'), 'AccountSearchPage');
const ChatPage = lazyPage(() => import('@/pages/chat'), 'ChatPage');
const ChatDetailPage = lazyPage(() => import('@/pages/chat-detail'), 'ChatDetailPage');
const ProfilePage = lazyPage(() => import('@/pages/profile'), 'ProfilePage');
const ProductCreatePage = lazyPage(() => import('@/pages/product-create'), 'ProductCreatePage');
const ProductUpdatePage = lazyPage(() => import('@/pages/product-update'), 'ProductUpdatePage');
const ProfileUpdatePage = lazyPage(() => import('@/pages/profile-update'), 'ProfileUpdatePage');
const FollowPage = lazyPage(() => import('@/pages/follow'), 'FollowPage');
const PostDetailPage = lazyPage(() => import('@/pages/post-detail'), 'PostDetailPage');
const SignInPage = lazyPage(() => import('@/pages/sign-in'), 'SignInPage');
const SignUpPage = lazyPage(() => import('@/pages/sign-up'), 'SignUpPage');
const ProfileSettingPage = lazyPage(() => import('@/pages/profile-setting'), 'ProfileSettingPage');
const PostCreatePage = lazyPage(() => import('@/pages/post-create'), 'PostCreatePage');
const PostUpdatePage = lazyPage(() => import('@/pages/post-update'), 'PostUpdatePage');
const NotFoundPage = lazyPage(() => import('@/pages/not-found'), 'NotFoundPage');

export {
  HomePage,
  FeedPage,
  AccountSearchPage,
  ChatPage,
  ChatDetailPage,
  ProfilePage,
  ProductCreatePage,
  ProductUpdatePage,
  ProfileUpdatePage,
  FollowPage,
  PostDetailPage,
  SignInPage,
  SignUpPage,
  ProfileSettingPage,
  PostCreatePage,
  PostUpdatePage,
  NotFoundPage,
};
