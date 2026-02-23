import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { useCommentMutation, usePostCommentsQuery } from '@/entities/comment';
import { usePostDetailQuery, usePostMutation } from '@/entities/post';
import { useMyInfoQuery } from '@/entities/user';
import {
  BackButton,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  KebabMenu,
  ProfileAvatar,
} from '@/shared/ui';
import { Header } from '@/widgets/header';

import CommentDetail from './CommentDetail';
import { PostDetail } from './PostDetail';

export const PostDetailPage = () => {
  const { postId = '' } = useParams<{ postId: string }>();
  const { data: user } = useMyInfoQuery();
  const { data: post, isLoading: isLoadingPost, isError: isErrorPost } = usePostDetailQuery(postId);
  const { createMutation } = useCommentMutation();
  const { deleteMutation, reportMutation } = usePostMutation();

  const {
    data: comments,
    isLoading: isLoadingComments,
    isError: isErrorComments,
  } = usePostCommentsQuery(postId);

  const [comment, setComment] = useState<string>('');
  const handleCommentSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMutation.mutate({ postId, content: comment });
    setComment('');
  };

  if (isLoadingPost || isLoadingComments) return <div>로딩 중...</div>;
  if (isErrorPost || isErrorComments) return <div>에러</div>;
  if (!post) return <div>게시글을 찾을 수 없습니다</div>;

  return (
    <>
      <Header
        left={<BackButton />}
        right={
          <KebabMenu
            items={[
              {
                label: '신고하기',
                onClick: () => {
                  reportMutation.mutate(postId);
                },
              },
              {
                label: '삭제',
                onClick: () => {
                  deleteMutation.mutate(postId);
                },
              },
            ]}
          />
        }
      />
      <main className="flex-1 overflow-y-auto">
        <article className="border-border border-b pb-4">
          <PostDetail post={post} />
        </article>
        <div className="divide-border divide-y">
          {Number(post.commentCount) > 0 ? (
            comments?.map((comment) => (
              <div key={comment.id} className="flex gap-3 px-4 py-4">
                <CommentDetail postId={postId} comment={comment} />
              </div>
            ))
          ) : (
            <div className="px-4 py-8 text-center">
              <p className="text-muted-foreground text-sm">아직 댓글이 없습니다</p>
            </div>
          )}
        </div>
      </main>
      <div className="border-border bg-background sticky right-0 bottom-0 left-0 border-t px-4 py-3">
        <form className="flex items-center gap-3" onSubmit={handleCommentSubmit}>
          <ProfileAvatar src={user?.image || ''} alt={user?.accountname || ''} size="lg" />
          <div className="relative flex-1">
            <InputGroup variant="default" size="lg">
              <InputGroupInput
                placeholder="댓글 입력하기..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <InputGroupAddon align="inline-end">
                <Button variant="ghost" type="submit" className="font-semibold">
                  게시
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </form>
      </div>
    </>
  );
};
