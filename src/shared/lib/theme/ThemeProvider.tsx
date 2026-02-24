import { createContext, useEffect, useMemo, useState } from 'react';

import type { Theme, ThemeContextType } from './types';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeMap = {
  system: 'light',
  light: 'dark',
  dark: 'system',
} as const;

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export const ThemeProvider = ({
  children,
  defaultTheme = 'system',
  storageKey = 'ui-theme',
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      const applySystemTheme = () => {
        const systemTheme = mediaQuery.matches ? 'dark' : 'light';
        root.classList.remove('light', 'dark');
        root.classList.add(systemTheme);
      };

      applySystemTheme();
      mediaQuery.addEventListener('change', applySystemTheme);

      return () => {
        mediaQuery.removeEventListener('change', applySystemTheme);
      };
    }

    root.classList.add(theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme: (newTheme: Theme) => {
        localStorage.setItem(storageKey, newTheme);
        setTheme(newTheme);
      },
      switchTheme: () => {
        setTheme((prev) => themeMap[prev as keyof typeof themeMap]);
      },
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
