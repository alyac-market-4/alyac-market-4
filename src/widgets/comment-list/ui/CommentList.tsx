import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { useDeleteComment, useReportComment } from '@/entities/comment';
import { getTokenUserInfo, timeAgo, useConfirmDialogStore } from '@/shared/lib';
import type { Comment } from '@/shared/model';
import { KebabMenu, ProfileAvatar } from '@/shared/ui';
import { TooltipMessage } from '@/shared/ui';

interface CommentListProps {
  postId: string;
  comment: Comment;
}

export function CommentList({ postId, comment }: CommentListProps) {
  const { mutate: deleteComment } = useDeleteComment();
  const { mutate: reportComment } = useReportComment();
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
                deleteComment(
                  { postId, commentId: comment.id },
                  {
                    onSuccess: () => {
                      toast.success('댓글이 삭제되었습니다.');
                    },
                    onError: () => {
                      toast.error('댓글 삭제에 실패했습니다.');
                    },
                  },
                );
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
                reportComment(
                  { postId, commentId: comment.id },
                  {
                    onSuccess: () => {
                      toast.success('신고가 접수되었습니다.');
                    },
                    onError: () => {
                      toast.error('댓글 신고에 실패했습니다.');
                    },
                  },
                );
              },
            });
          },
        },
      ];

  return (
    <>
      <Link to={`/profile/${comment.author.accountname}`}>
        <ProfileAvatar size="lg" src={comment.author.image} alt={comment.author.username} />
      </Link>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              to={`/profile/${comment.author.accountname}`}
              className="text-foreground font-semibold"
            >
              {comment.author.username}
            </Link>
            <TooltipMessage message={new Date(comment.createdAt).toLocaleString()}>
              <span className="text-muted-foreground text-xs">
                · {timeAgo(new Date(comment.createdAt))}
              </span>
            </TooltipMessage>
          </div>
          <KebabMenu items={kebabMenuItems} />
        </div>
        <p className="text-foreground text-sm leading-relaxed">{comment.content}</p>
      </div>
    </>
  );
}
