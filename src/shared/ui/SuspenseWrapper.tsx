import { Suspense } from 'react';

import { LoadingState } from '@/shared/ui';

export const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingState />}>{children}</Suspense>
);
