import { toast } from 'sonner';

import { useCommentMutation } from '@/entities/comment';
import { getTokenUserInfo, useConfirmDialogStore } from '@/shared/lib';
import type { Comment } from '@/shared/model';
import { KebabMenu, ProfileAvatar } from '@/shared/ui';

interface CommentListProps {
  postId: string;
  comment: Comment;
}

export function CommentList({ postId, comment }: CommentListProps) {
  const { deleteMutation, reportMutation } = useCommentMutation();
  const { openConfirm } = useConfirmDialogStore();
  const isMe = comment.author.accountname === getTokenUserInfo().accountname;
  const kebabMenuItems = isMe
    ? [
        {
          label: '삭제',
          onClick: () => {
            openConfirm({
              title: '정말 삭제하시겠습니까?',
              description: '삭제된 댓글은 복구할 수 없습니다.',
              actionText: '삭제',
              onConfirm: () => {
                deleteMutation.mutate({ postId, commentId: comment.id });
                toast.info('댓글이 삭제되었습니다.');
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
                reportMutation.mutate({ postId, commentId: comment.id });
                toast.info('신고가 접수되었습니다.');
              },
            });
          },
        },
      ];

  return (
    <>
      <ProfileAvatar size="lg" src={comment.author.image} alt={comment.author.username} />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-foreground font-semibold">{comment.author.username}</span>
            <span className="text-muted-foreground text-xs">
              · {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          <KebabMenu items={kebabMenuItems} />
        </div>
        <p className="text-foreground text-sm leading-relaxed">{comment.content}</p>
      </div>
    </>
  );
}
