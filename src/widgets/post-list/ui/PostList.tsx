import { EllipsisVertical, Heart, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { usePostMutation, useUserPostsQuery } from '@/entities/post';
import { useMyInfoQuery } from '@/entities/user';
import { ErrorView, IconButton, LoadingState } from '@/shared/ui';

export const PostList = () => {
  const navigate = useNavigate();
  const { toggleLikeMutation } = usePostMutation();
  // TODO: URL params가 없는 경우만 useMyInfoQuery 사용해야 함
  const { data: user } = useMyInfoQuery();
  const {
    data: posts = [],
    isLoading,
    isError,
    refetch,
  } = useUserPostsQuery(user?.accountname || '');

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorView message={'게시글 목록 불러오기 실패'} onRetry={() => refetch()} />
      ) : posts.length > 0 ? (
        posts.map((post) => {
          return (
            <article key={post.id} className="border-border border-b pb-4">
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
                    <span className="text-foreground font-semibold">{post.author.username}</span>
                    <span className="text-muted-foreground text-sm">
                      @{post.author.accountname}
                    </span>
                  </div>
                </div>
                <IconButton
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls="radix-_r_2n_"
                  data-state="closed"
                >
                  <EllipsisVertical />
                </IconButton>
              </div>
              <p className="text-foreground mb-3 ml-12 text-sm leading-relaxed">{post.content}</p>
              <img
                alt="Post content"
                className="ml-12 h-40 w-11/12 rounded-lg object-cover"
                src={post.image}
              />
              <div className="mt-3 ml-12 flex gap-4">
                <button
                  onClick={() => toggleLikeMutation.mutate(post.id)}
                  className="ring-offset-background focus-visible:ring-ring hover:text-accent-foreground inline-flex h-auto cursor-pointer items-center justify-center gap-1.5 rounded-md p-0 text-sm font-medium whitespace-nowrap transition-colors hover:bg-transparent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0"
                  type="button"
                >
                  <Heart />
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
                  <MessageCircle />
                  <span className="text-muted-foreground text-sm">{post.commentCount}</span>
                </button>
              </div>
            </article>
          );
        })
      ) : (
        <div className="py-8 text-center">
          <p className="text-muted-foreground text-sm">작성한 게시물이 없습니다</p>
        </div>
      )}
    </>
  );
};
