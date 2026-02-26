import { create } from 'zustand';

import { storageKey, themeMap } from './constants';

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  switchTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: (localStorage.getItem(storageKey) as Theme) || 'system',
  setTheme: (theme) =>
    set(() => {
      localStorage.setItem(storageKey, theme);
      return { theme };
    }),
  switchTheme: () =>
    set((prev) => {
      const nextTheme = themeMap[prev.theme];
      localStorage.setItem(storageKey, nextTheme);
      return { theme: nextTheme };
    }),
}));
