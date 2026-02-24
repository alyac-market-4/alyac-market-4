import { Suspense } from 'react';

import { LoadingState } from './LoadingState';

export const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingState />}>{children}</Suspense>
);
