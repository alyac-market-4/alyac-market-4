import { useQuery } from '@tanstack/react-query';
import { EllipsisVertical } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { commentApi } from '@/entities/comment';
import { commentKeys } from '@/entities/comment/model/keys';
import { postApi } from '@/entities/post';
import { postKeys } from '@/entities/post/model/keys';
import { BackButton, IconButton } from '@/shared/ui';
import { Header } from '@/widgets/header';

export const PostDetailPage = () => {
  const { postId = '' } = useParams<{ postId: string }>();

  const {
    data: post,
    isLoading: isLoadingPost,
    isError: isErrorPost,
  } = useQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => postApi.getPostDetail(postId),
  });

  const {
    data: comments,
    isLoading: isLoadingComments,
    isError: isErrorComments,
  } = useQuery({
    queryKey: commentKeys.list(postId),
    queryFn: () => commentApi.getPostComments(postId),
  });

  if (isLoadingPost || isLoadingComments) return <div>로딩 중...</div>;
  if (isErrorPost || isErrorComments) return <div>에러</div>;

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
      <main className="flex-1 overflow-y-auto">
        <article className="border-border border-b pb-4">
          <div className="flex items-center gap-3 px-4 py-4">
            <div className="bg-muted flex h-12 w-12 items-center justify-center overflow-hidden rounded-full">
              <img
                alt={post?.author.username}
                className="h-full w-full object-cover"
                src={post?.author.image}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-foreground font-semibold">{post?.author.username}</span>
              <span className="text-muted-foreground text-sm">@{post?.author.accountname}</span>
            </div>
          </div>
          <div className="px-4 pb-4">
            <p className="text-foreground text-base leading-relaxed whitespace-pre-wrap">
              {post?.content}
            </p>
          </div>
          {post?.image && (
            <div className="mb-4 space-y-2 px-4">
              <img
                alt="Post image 1"
                className="h-auto w-full rounded-xl object-cover"
                src={post?.image}
              />
            </div>
          )}
          <div className="flex items-center gap-4 px-4">
            <button
              className="ring-offset-background focus-visible:ring-ring hover:text-accent-foreground inline-flex h-auto cursor-pointer items-center justify-center gap-1.5 rounded-md p-0 text-sm font-medium whitespace-nowrap transition-colors hover:bg-transparent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0"
              type="button"
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 fill-red-500 text-red-500 transition-colors"
              >
                <path
                  d="M16.9202 4.01322C16.5204 3.60554 16.0456 3.28215 15.5231 3.0615C15.0006 2.84086 14.4406 2.72729 13.875 2.72729C13.3094 2.72729 12.7494 2.84086 12.2268 3.0615C11.7043 3.28215 11.2296 3.60554 10.8298 4.01322L9.99997 4.85889L9.17017 4.01322C8.36252 3.19013 7.26713 2.72772 6.12495 2.72772C4.98277 2.72772 3.88737 3.19013 3.07973 4.01322C2.27209 4.83631 1.81836 5.95266 1.81836 7.11668C1.81836 8.28071 2.27209 9.39706 3.07973 10.2201L3.90953 11.0658L9.99997 17.2728L16.0904 11.0658L16.9202 10.2201C17.3202 9.81266 17.6376 9.32885 17.8541 8.79635C18.0706 8.26385 18.182 7.69309 18.182 7.11668C18.182 6.54028 18.0706 5.96952 17.8541 5.43702C17.6376 4.90452 17.3202 4.4207 16.9202 4.01322Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <span className="text-muted-foreground text-sm">{post?.heartCount}</span>
            </button>
            <div className="flex items-center gap-1.5">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-muted-foreground h-6 w-6"
              >
                <path
                  d="M17.5 9.58336C17.5029 10.6832 17.2459 11.7683 16.75 12.75C16.162 13.9265 15.2581 14.916 14.1395 15.6078C13.021 16.2995 11.7319 16.6662 10.4167 16.6667C9.31678 16.6696 8.23176 16.4126 7.25 15.9167L2.5 17.5L4.08333 12.75C3.58744 11.7683 3.33047 10.6832 3.33333 9.58336C3.33384 8.26815 3.70051 6.97907 4.39227 5.86048C5.08402 4.7419 6.07355 3.838 7.25 3.25002C8.23176 2.75413 9.31678 2.49716 10.4167 2.50002H10.8333C12.5703 2.59585 14.2109 3.32899 15.4409 4.55907C16.671 5.78915 17.4042 7.42973 17.5 9.16669V9.58336Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <span className="text-muted-foreground text-sm">{post?.commentCount}</span>
            </div>
          </div>
        </article>
        <div className="divide-border divide-y">
          {Number(post?.commentCount) > 0 ? (
            comments?.map((comment) => (
              <div className="flex gap-3 px-4 py-4">
                <div className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full">
                  <img
                    alt={comment.author.username}
                    className="h-full w-full object-cover"
                    src={comment.author.image}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-foreground font-semibold">
                        {comment.author.username}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        · {comment.createdAt.toString()}
                      </span>
                    </div>
                    <button
                      className="ring-offset-background focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground inline-flex h-6 w-6 cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0"
                      type="button"
                      aria-haspopup="dialog"
                      aria-expanded="false"
                      aria-controls="radix-_r_5d_"
                      data-state="closed"
                    >
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-muted-foreground h-4 w-4"
                      >
                        <path
                          d="M9 9.75001C9.41421 9.75001 9.75 9.41423 9.75 9.00001C9.75 8.5858 9.41421 8.25002 9 8.25002C8.58579 8.25002 8.25 8.5858 8.25 9.00001C8.25 9.41423 8.58579 9.75001 9 9.75001Z"
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M9 4.49999C9.41421 4.49999 9.75 4.1642 9.75 3.74999C9.75 3.33577 9.41421 2.99999 9 2.99999C8.58579 2.99999 8.25 3.33577 8.25 3.74999C8.25 4.1642 8.58579 4.49999 9 4.49999Z"
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M9 15C9.41421 15 9.75 14.6642 9.75 14.25C9.75 13.8358 9.41421 13.5 9 13.5C8.58579 13.5 8.25 13.8358 8.25 14.25C8.25 14.6642 8.58579 15 9 15Z"
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <p className="text-foreground text-sm leading-relaxed">{comment.content}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-8 text-center">
              <p className="text-muted-foreground text-sm">아직 댓글이 없습니다</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};
