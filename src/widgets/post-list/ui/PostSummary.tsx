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

  const goDetail = () => navigate(to);

  // 이미지 개수 계산
  const imageCount = (post.image ?? '')
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean).length;

  return (
    <article
      key={post.id}
      className="border-border cursor-pointer border-b py-4"
      onClick={goDetail}
    >
      <div className="mb-3 flex items-center justify-between">
        <ProfileBadge
          username={post.author.username}
          accountname={post.author.accountname}
          image={post.author.image}
        />

        {/* 메뉴 클릭 시 게시물 이동 방지 */}
        <div onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
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
      </div>

      {/* 본문 */}
      <p className="text-foreground mb-3 ml-12 text-sm leading-relaxed">{post.content}</p>

      {/* 이미지 */}
      {post.image && (
        <div className="ml-12">
          <PostImage src={post.image} alt="Post image" />

          {/* 여러 장일 때만 표시 */}
          {imageCount > 1 && (
            <div className="text-muted-foreground mt-1 text-xs">{imageCount}장</div>
          )}
        </div>
      )}

      {/* 좋아요 / 댓글 */}
      <div className="mt-3 ml-12 flex gap-4">
        <div onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
          <LikeButton postId={post.id} heartCount={post.heartCount} hearted={post.hearted} />
        </div>

        <div
          onClick={(e) => {
            e.stopPropagation();
            navigate(to);
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <CommentButton commentCount={post.commentCount} />
        </div>
      </div>
    </article>
  );
};
