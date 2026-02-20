import { EllipsisVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { usePostMutation, useUserPostsQuery } from '@/entities/post';
import { useUserProductsQuery } from '@/entities/product/api/useProductQuery';
import { useUserQuery } from '@/entities/user';
import { removeToken } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { BackButton } from '@/shared/ui/BackButton';
import { IconButton } from '@/shared/ui/IconButton';
import { Header } from '@/widgets/header';

export const ProfilePage = () => {
  const navigate = useNavigate();

  const { data: user, isLoading, isError } = useUserQuery();
  const { data: posts = [] } = useUserPostsQuery(user?.accountname || '');
  const { toggleLikeMutation } = usePostMutation();
  const { data: products = [] } = useUserProductsQuery(user?.accountname || '');

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러</div>;

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
        <div className="border-border border-b px-4 py-6">
          <div className="flex items-center justify-center gap-12">
            <div className="hover:text-primary flex cursor-pointer flex-col items-center">
              <span className="text-foreground text-xl font-bold">{user?.followerCount}</span>
              <span className="text-muted-foreground text-sm">Followers</span>
            </div>
            <div className="bg-muted flex h-24 w-24 items-center justify-center overflow-hidden rounded-full">
              <img alt={user?.username} className="h-full w-full object-cover" src={user?.image} />
            </div>
            <div className="hover:text-primary flex cursor-pointer flex-col items-center">
              <span className="text-foreground text-xl font-bold">{user?.followingCount}</span>
              <span className="text-muted-foreground text-sm">Followings</span>
            </div>
          </div>
          <div className="mt-4 space-y-1 text-center">
            <h2 className="text-foreground text-base font-bold">{user?.username}</h2>
            <p className="text-muted-foreground text-sm">@{user?.accountname}</p>
            <p className="text-foreground text-sm">{user?.intro}</p>
          </div>
          <div className="mt-4 flex gap-2 px-20">
            <Button
              onClick={() => navigate('/profile-update')}
              variant="outline"
              size="lg"
              className="flex-1"
              type="button"
            >
              프로필 수정
            </Button>
            <Button
              onClick={() => navigate('/product/create')}
              variant="outline"
              size="lg"
              className="flex-1"
              type="button"
            >
              상품 등록
            </Button>
          </div>
        </div>
        <div className="border-border border-b py-4">
          <div className="flex items-center justify-between px-4 pb-3">
            <h3 className="text-foreground text-base font-bold">판매 중인 상품</h3>
          </div>
          <div className="scrollbar-hide flex gap-3 overflow-x-auto px-4 pb-2">
            {products.length > 0 ? (
              products?.map((product) => (
                <div
                  key={product.itemImage}
                  className="relative w-32 shrink-0 cursor-pointer overflow-hidden rounded-lg"
                >
                  <img
                    alt={product.itemName}
                    className="h-32 w-full object-cover"
                    src={product.itemImage}
                  />
                  <div className="mt-2">
                    <p className="text-foreground text-sm font-medium">{product.itemName}</p>
                    <p className="text-sm font-bold text-green-600">{product.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground text-sm">등록한 상품이 없습니다</p>
              </div>
            )}
          </div>
        </div>
        <div className="border-border flex items-center justify-end border-b px-4 py-4">
          <div className="flex gap-1">
            <button
              className="ring-offset-background focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground text-foreground inline-flex h-8 w-8 cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0"
              type="button"
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
              >
                <path
                  d="M22.75 3.25H3.25V7.58333H22.75V3.25Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M22.75 10.8333H3.25V15.1667H22.75V10.8333Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M22.75 18.4167H3.25V22.75H22.75V18.4167Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                ></path>
              </svg>
            </button>
            <button
              className="ring-offset-background focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground text-muted-foreground inline-flex h-8 w-8 cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0"
              type="button"
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
              >
                <path
                  d="M10.8333 3.25H3.25V10.8333H10.8333V3.25Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M22.7501 3.25H15.1667V10.8333H22.7501V3.25Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M22.7501 15.1667H15.1667V22.75H22.7501V15.1667Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M10.8333 15.1667H3.25V22.75H10.8333V15.1667Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="px-4 py-4">
          {posts.length > 0 ? (
            posts.map((post) => {
              return (
                <div key={post.id} className="border-border border-b pb-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-muted flex h-12 w-12 items-center justify-center overflow-hidden rounded-full">
                        <img
                          alt={post.author.username}
                          className="h-full w-full object-cover"
                          src={post.author.image}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-foreground font-semibold">
                          {post.author.username}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          @{post.author.accountname}
                        </span>
                      </div>
                    </div>
                    <button
                      className="ring-offset-background focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground inline-flex h-10 w-10 cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0"
                      type="button"
                      aria-haspopup="dialog"
                      aria-expanded="false"
                      aria-controls="radix-_r_2n_"
                      data-state="closed"
                    >
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-muted-foreground h-5 w-5"
                      >
                        <path
                          d="M9 9.75001C9.41421 9.75001 9.75 9.41423 9.75 9.00001C9.75 8.5858 9.41421 8.25002 9 8.25002C8.58579 8.25002 8.25 8.5858 8.25 9.00001C8.25 9.41423 8.58579 9.75001 9 9.75001Z"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M9 4.49999C9.41421 4.49999 9.75 4.1642 9.75 3.74999C9.75 3.33577 9.41421 2.99999 9 2.99999C8.58579 2.99999 8.25 3.33577 8.25 3.74999C8.25 4.1642 8.58579 4.49999 9 4.49999Z"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M9 15C9.41421 15 9.75 14.6642 9.75 14.25C9.75 13.8358 9.41421 13.5 9 13.5C8.58579 13.5 8.25 13.8358 8.25 14.25C8.25 14.6642 8.58579 15 9 15Z"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <p className="text-foreground mb-3 ml-12 text-sm leading-relaxed">
                    {post.content}
                  </p>
                  <div className="mt-3 ml-12 flex gap-4">
                    <button
                      onClick={() => toggleLikeMutation.mutate(post.id)}
                      className="ring-offset-background focus-visible:ring-ring hover:text-accent-foreground inline-flex h-auto cursor-pointer items-center justify-center gap-1.5 rounded-md p-0 text-sm font-medium whitespace-nowrap transition-colors hover:bg-transparent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0"
                      type="button"
                    >
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-muted-foreground h-6 w-6 transition-colors hover:text-red-400"
                      >
                        <path
                          d="M16.9202 4.01322C16.5204 3.60554 16.0456 3.28215 15.5231 3.0615C15.0006 2.84086 14.4406 2.72729 13.875 2.72729C13.3094 2.72729 12.7494 2.84086 12.2268 3.0615C11.7043 3.28215 11.2296 3.60554 10.8298 4.01322L9.99997 4.85889L9.17017 4.01322C8.36252 3.19013 7.26713 2.72772 6.12495 2.72772C4.98277 2.72772 3.88737 3.19013 3.07973 4.01322C2.27209 4.83631 1.81836 5.95266 1.81836 7.11668C1.81836 8.28071 2.27209 9.39706 3.07973 10.2201L3.90953 11.0658L9.99997 17.2728L16.0904 11.0658L16.9202 10.2201C17.3202 9.81266 17.6376 9.32885 17.8541 8.79635C18.0706 8.26385 18.182 7.69309 18.182 7.11668C18.182 6.54028 18.0706 5.96952 17.8541 5.43702C17.6376 4.90452 17.3202 4.4207 16.9202 4.01322Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      {toggleLikeMutation.isPending ? (
                        '좋아요 중...'
                      ) : (
                        <span className="text-muted-foreground text-sm">{post.heartCount}</span>
                      )}
                    </button>
                    <button
                      onClick={() => navigate(`/post/${post.id}`)}
                      className="ring-offset-background focus-visible:ring-ring hover:text-accent-foreground inline-flex h-auto cursor-pointer items-center justify-center gap-1.5 rounded-md p-0 text-sm font-medium whitespace-nowrap transition-colors hover:bg-transparent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0"
                      type="button"
                    >
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-muted-foreground hover:text-primary h-6 w-6 transition-colors"
                      >
                        <path
                          d="M17.5 9.58336C17.5029 10.6832 17.2459 11.7683 16.75 12.75C16.162 13.9265 15.2581 14.916 14.1395 15.6078C13.021 16.2995 11.7319 16.6662 10.4167 16.6667C9.31678 16.6696 8.23176 16.4126 7.25 15.9167L2.5 17.5L4.08333 12.75C3.58744 11.7683 3.33047 10.6832 3.33333 9.58336C3.33384 8.26815 3.70051 6.97907 4.39227 5.86048C5.08402 4.7419 6.07355 3.838 7.25 3.25002C8.23176 2.75413 9.31678 2.49716 10.4167 2.50002H10.8333C12.5703 2.59585 14.2109 3.32899 15.4409 4.55907C16.671 5.78915 17.4042 7.42973 17.5 9.16669V9.58336Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <span className="text-muted-foreground text-sm">{post.commentCount}</span>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground text-sm">작성한 게시물이 없습니다</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};
