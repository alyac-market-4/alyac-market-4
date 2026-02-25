import { useNavigate } from 'react-router-dom';

import { CommentButton, usePostMutation } from '@/entities/post';
import { ProfileBadge } from '@/entities/profile';
import { LikeButton } from '@/features/like-post';
import { useConfirmDialog } from '@/shared/lib';
import type { Post } from '@/shared/model';
import { KebabMenu, PostImage } from '@/shared/ui';

interface PostSummaryProps {
  post: Post;
  to: string;
}

export const PostSummary = ({ post, to }: PostSummaryProps) => {
  const navigate = useNavigate();
  const { deleteMutation } = usePostMutation();
  const { openConfirm } = useConfirmDialog();

  return (
    <article key={post.id} className="border-border border-b py-4">
      <div className="mb-3 flex items-center justify-between">
        <ProfileBadge
          username={post.author.username}
          accountname={post.author.accountname}
          image={post.author.image}
        />
        <KebabMenu
          items={[
            { label: '수정', onClick: () => navigate(`/post-update/${post.id}`) },
            {
              label: '삭제',
              onClick: () => {
                openConfirm({
                  title: '정말 삭제하시겠습니까?',
                  description: '삭제된 게시물은 복구할 수 없습니다.',
                  actionText: '삭제',
                  onConfirm: () => deleteMutation.mutate(post.id),
                });
              },
            },
          ]}
        />
      </div>
      <p className="text-foreground mb-3 ml-12 text-sm leading-relaxed">{post.content}</p>
      {post.image && (
        <div className="ml-12">
          <PostImage src={post.image} alt="Post image" />
        </div>
      )}
      <div className="mt-3 ml-12 flex gap-4">
        <LikeButton postId={post.id} heartCount={post.heartCount} hearted={post.hearted} />
        <CommentButton commentCount={post.commentCount} onClick={() => navigate(to)} />
      </div>
    </article>
  );
};
