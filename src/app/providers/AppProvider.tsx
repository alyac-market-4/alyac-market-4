import type { ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

import { ConfirmRenderer } from '@/shared/lib';
import { Toaster } from '@/shared/ui';

import { ThemeProvider } from './ThemeProvider';
import { queryClient } from './queryClient';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {children}
        <Toaster position="top-right" />
        <ConfirmRenderer />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
