import type { ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

import { ConfirmDialogProvider, ThemeProvider } from '@/shared/lib';

import { queryClient } from './queryClient';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ConfirmDialogProvider>
          <div className="bg-background flex min-h-screen flex-col">{children}</div>
        </ConfirmDialogProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
