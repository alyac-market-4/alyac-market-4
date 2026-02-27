import { useState } from 'react';

import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { useCommentMutation, usePostCommentsQuery } from '@/entities/comment';
import { usePostDetailQuery, usePostMutation } from '@/entities/post';
import { useUserProfileQuery } from '@/entities/profile';
import { useConfirmDialogStore } from '@/shared/lib';
import { getTokenUserInfo } from '@/shared/lib';
import {
  BackButton,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  KebabMenu,
  ProfileAvatar,
} from '@/shared/ui';
import { CommentList } from '@/widgets/comment-list';
import { Header } from '@/widgets/header';
import { PostDetail } from '@/widgets/post-detail';

export const PostDetailPage = () => {
  const { postId = '' } = useParams<{ postId: string }>();
  const { data: user } = useUserProfileQuery(getTokenUserInfo().accountname);
  const { data: post, isLoading: isLoadingPost, isError: isErrorPost } = usePostDetailQuery(postId);
  const { createMutation } = useCommentMutation();
  const { deleteMutation, reportMutation } = usePostMutation();
  const { openConfirm } = useConfirmDialogStore();

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

  const isMe = post.author.accountname === getTokenUserInfo().accountname;
  const kebabMenuItems = isMe
    ? [
        {
          label: '삭제',
          onClick: () => {
            openConfirm({
              title: '정말 삭제하시겠습니까?',
              description: '삭제된 게시물은 복구할 수 없습니다.',
              actionText: '삭제',
              onConfirm: () => {
                deleteMutation.mutate(postId);
                toast.info('게시글이 삭제되었습니다.');
              },
            });
          },
        },
      ]
    : [
        {
          label: '신고하기',
          onClick: () => {
            openConfirm({
              title: '정말 신고하시겠습니까?',
              description: '신고는 취소할 수 없습니다.',
              actionText: '신고',
              onConfirm: () => {
                reportMutation.mutate(postId);
                toast.info('신고가 접수되었습니다.');
              },
            });
          },
        },
      ];

  return (
    <>
      <Header left={<BackButton />} right={<KebabMenu items={kebabMenuItems} />} />
      <main className="flex-1 overflow-y-auto">
        <article className="border-border border-b pb-4">
          <PostDetail post={post} />
        </article>
        <div className="divide-border divide-y">
          {Number(post.commentCount) > 0 ? (
            comments?.map((comment) => (
              <div key={comment.id} className="flex gap-3 px-4 py-4">
                <CommentList postId={postId} comment={comment} />
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
