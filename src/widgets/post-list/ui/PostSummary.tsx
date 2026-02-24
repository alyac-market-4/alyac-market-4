import { useNavigate } from 'react-router-dom';

import { CommentButton, usePostMutation } from '@/entities/post';
import { ProfileBadge } from '@/entities/profile';
import { LikeButton } from '@/features/like-post';
import type { Post } from '@/shared/model';
import { KebabMenu } from '@/shared/ui';

interface PostSummaryProps {
  post: Post;
}

export const PostSummary = ({ post }: PostSummaryProps) => {
  const navigate = useNavigate();
  const { deleteMutation } = usePostMutation();

  return (
    <article key={post.id} className="border-border border-b pb-4">
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
                deleteMutation.mutate(post.id);
              },
            },
          ]}
        />
      </div>
      <p className="text-foreground mb-3 ml-12 text-sm leading-relaxed">{post.content}</p>
      {post.image && (
        <img
          alt="Post content"
          className="ml-12 h-40 w-11/12 rounded-lg object-cover"
          src={post.image}
        />
      )}
      <div className="mt-3 ml-12 flex gap-4">
        <LikeButton postId={post.id} heartCount={post.heartCount} hearted={post.hearted} />
        <CommentButton
          commentCount={post.commentCount}
          onClick={() => navigate(`/post/${post.id}`)}
        />
      </div>
    </article>
  );
};
