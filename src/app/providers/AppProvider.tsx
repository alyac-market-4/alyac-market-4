import type { ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

import { useTheme } from '@/shared/lib';
import { ConfirmRenderer } from '@/shared/lib';

import { queryClient } from './queryClient';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-background flex min-h-screen flex-col">{children}</div>
      <ConfirmRenderer />
    </QueryClientProvider>
  );
};
