import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { storageKey, themeMap } from './constants';

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeState {
  theme: Theme;
  initThemeByLocalStorage: () => void;
  setTheme: (theme: Theme) => void;
  switchTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      initThemeByLocalStorage: () =>
        set(() => {
          const theme = 'system';
          return { theme };
        }),
      setTheme: (theme) =>
        set(() => {
          return { theme };
        }),
      switchTheme: () =>
        set((prev) => {
          const theme = themeMap[prev.theme];
          return { theme };
        }),
    }),
    {
      name: storageKey,
    },
  ),
);
