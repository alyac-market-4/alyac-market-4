import { FriendCardSkeleton } from '@/entities/user';

export function FriendListSkeleton() {
  return (
    <section className="divide-border divide-y">
      <FriendCardSkeleton />
      <FriendCardSkeleton />
      <FriendCardSkeleton />
    </section>
  );
}
