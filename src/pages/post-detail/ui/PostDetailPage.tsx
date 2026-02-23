import { useQuery } from '@tanstack/react-query';
import { EllipsisVertical } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { commentApi } from '@/entities/comment';
import { commentKeys } from '@/entities/comment/model/keys';
import { postApi } from '@/entities/post';
import { postKeys } from '@/entities/post/model/keys';
import { PostDetail } from '@/pages/post-detail/ui/PostDetail';
import {
  BackButton,
  Button,
  IconButton,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/shared/ui';
import { Header } from '@/widgets/header';

import CommentDetail from './CommentDetail';

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
  if (!post) return <div>게시글을 찾을 수 없습니다</div>;

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
          <PostDetail post={post} />
        </article>
        <div className="divide-border divide-y">
          {Number(post.commentCount) > 0 ? (
            comments?.map((comment) => (
              <div className="flex gap-3 px-4 py-4">
                <CommentDetail comment={comment} />
              </div>
            ))
          ) : (
            <div className="px-4 py-8 text-center">
              <p className="text-muted-foreground text-sm">아직 댓글이 없습니다</p>
            </div>
          )}
        </div>
        <div className="border-border bg-background fixed right-0 bottom-0 left-0 border-t px-4 py-3">
          <form className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-300"></div>
            <div className="relative flex-1">
              <InputGroup variant="default" size="lg">
                <InputGroupInput placeholder="댓글 입력하기..." />
                <InputGroupAddon align="inline-end">
                  <Button variant="ghost" type="submit" className="font-semibold">
                    게시
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};
