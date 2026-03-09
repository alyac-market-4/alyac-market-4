import { PostSummarySkeleton } from '@/entities/post';

export const FeedListSkeleton = () => {
  return (
    <section className="flex flex-col gap-4">
      <PostSummarySkeleton />
      <PostSummarySkeleton />
      <PostSummarySkeleton />
    </section>
  );
};
