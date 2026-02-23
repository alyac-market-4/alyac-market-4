import { CommentButton } from '@/entities/post';
import { ProfileBadge } from '@/entities/profile';
import { LikeButton } from '@/features/like-post';
import type { Post } from '@/shared/model';

export const PostDetail = ({ post }: { post: Post }) => {
  return (
    <>
      <div className="flex items-center gap-3 px-4 py-4">
        <ProfileBadge
          accountname={post.author.accountname}
          image={post.author.image}
          username={post.author.username}
        />
      </div>
      <div className="px-4 pb-4">
        <p className="text-foreground text-base leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
      </div>
      {post.image && (
        <div className="mb-4 space-y-2 px-4">
          <img
            alt="Post image 1"
            className="h-auto w-full rounded-xl object-cover"
            src={post.image}
          />
        </div>
      )}
      <div className="flex items-center gap-4 px-4">
        <LikeButton postId={post.id} heartCount={post.heartCount} hearted={post.hearted} />
        <div className="flex items-center gap-1.5">
          <CommentButton commentCount={post.commentCount} />
        </div>
      </div>
    </>
  );
};
