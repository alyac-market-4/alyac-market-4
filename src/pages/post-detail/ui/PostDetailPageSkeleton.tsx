import { PostContentSkeleton } from '@/entities/post';
import { CommentListSkeleton } from '@/widgets/comment-list';
import { Header } from '@/widgets/header';

export function PostDetailPageSkeleton() {
  return (
    <>
      <Header />
      <PostContentSkeleton />
      <CommentListSkeleton />
    </>
  );
}
