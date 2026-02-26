import type { ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

import { useApplyTheme } from '@/shared/lib';
import { ConfirmRenderer } from '@/shared/lib';
import { Toaster } from '@/shared/ui';

import { queryClient } from './queryClient';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  useApplyTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-background flex min-h-screen flex-col">{children}</div>
      <Toaster position="top-right" />
      <ConfirmRenderer />
    </QueryClientProvider>
  );
};
