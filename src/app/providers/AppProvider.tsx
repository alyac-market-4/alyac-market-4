import type { ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/app/providers/queryClient';
import { ThemeProvider } from '@/shared/lib/theme';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <div className="bg-background flex min-h-screen flex-col">{children}</div>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
