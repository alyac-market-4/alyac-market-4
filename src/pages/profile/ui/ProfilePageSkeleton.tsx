import { ProfileActionsSkeleton } from '@/entities/profile';
import type { ViewMode } from '@/features/layout-controller';
import { Header } from '@/widgets/header';
import { PostListSkeleton } from '@/widgets/post-list';
import { ProductListSkeleton } from '@/widgets/product-list';
import { ProfileCardSkeleton } from '@/widgets/profile-card';

interface ProfilePageSkeletonProps {
  viewMode: ViewMode;
  setViewMode: (viewMode: ViewMode) => void;
}

export function ProfilePageSkeleton({ viewMode }: ProfilePageSkeletonProps) {
  return (
    <>
      <Header />

      <section className="border-border border-b px-4 py-6">
        <ProfileCardSkeleton />
        <ProfileActionsSkeleton />
      </section>
      <ProductListSkeleton />
      <PostListSkeleton viewMode={viewMode} />
    </>
  );
}
