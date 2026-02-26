import { useNavigate } from 'react-router-dom';

import { CommentButton, usePostMutation } from '@/entities/post';
import { ProfileBadge } from '@/entities/profile';
import { LikeButton } from '@/features/like-post';
import { useConfirmDialogStore } from '@/shared/lib';
import type { Post } from '@/shared/model';
import { KebabMenu, PostImage } from '@/shared/ui';

interface PostSummaryProps {
  post: Post;
  to: string;
}

export const PostSummary = ({ post, to }: PostSummaryProps) => {
  const navigate = useNavigate();
  const { deleteMutation } = usePostMutation();
  const { openConfirm } = useConfirmDialogStore();

  const goDetail = () => navigate(to);

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

        {/* 메뉴 클릭은 게시물 이동이랑 분리 (전파 차단은 wrapper에서) */}
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

      <p className="text-foreground mb-3 ml-12 text-sm leading-relaxed">{post.content}</p>

      {post.image && (
        <div className="ml-12">
          <PostImage src={post.image} alt="Post image" />
        </div>
      )}

      <div className="mt-3 ml-12 flex gap-4">
        {/*  좋아요 영역도 전파 차단 (좋아요 누를 때 상세로 이동 못하도록) */}
        <div onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
          <LikeButton postId={post.id} heartCount={post.heartCount} hearted={post.hearted} />
        </div>

        {/*  댓글 버튼도 마찬가지로 wrapper에서 전파 차단 + 클릭 시 이동 */}
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
