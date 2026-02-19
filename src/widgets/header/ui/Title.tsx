import type { ReactNode } from 'react';

export const Title = ({ children }: { children: ReactNode }) => (
  <h1 className="text-foreground text-lg font-bold">{children}</h1>
);
