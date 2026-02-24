import { useCommentMutation } from '@/entities/comment';
import { useConfirmDialog } from '@/shared/lib/confirm-dialog/useConfirmDialog';
import type { Comment } from '@/shared/model';
import { KebabMenu, ProfileAvatar } from '@/shared/ui';

interface CommentDetailProps {
  postId: string;
  comment: Comment;
}

export default function CommentDetail({ postId, comment }: CommentDetailProps) {
  const { deleteMutation, reportMutation } = useCommentMutation();
  const { openConfirm } = useConfirmDialog();

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
          <KebabMenu
            items={[
              {
                label: '신고하기',
                onClick: () => {
                  reportMutation.mutate({ postId, commentId: comment.id });
                },
              },
              {
                label: '삭제',
                onClick: () => {
                  openConfirm({
                    title: '정말 삭제하시겠습니까?',
                    description: '삭제된 게시물은 복구할 수 없습니다.',
                    actionText: '삭제',
                    onConfirm: () => deleteMutation.mutate({ postId, commentId: comment.id }),
                  });
                },
              },
            ]}
          />
        </div>
        <p className="text-foreground text-sm leading-relaxed">{comment.content}</p>
      </div>
    </>
  );
}
