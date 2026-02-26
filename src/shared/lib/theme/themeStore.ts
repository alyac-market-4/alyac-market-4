import { create } from 'zustand';

import { storageKey, themeMap } from './constants';

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeState {
  theme: Theme;
  initThemeByLocalStorage: () => void;
  setTheme: (theme: Theme) => void;
  switchTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: (localStorage.getItem(storageKey) as Theme) || 'system',
  initThemeByLocalStorage: () =>
    set(() => {
      const theme = (localStorage.getItem(storageKey) as Theme) || 'system';
      localStorage.setItem(storageKey, theme);
      return { theme };
    }),
  setTheme: (theme) =>
    set(() => {
      localStorage.setItem(storageKey, theme);
      return { theme };
    }),
  switchTheme: () =>
    set((prev) => {
      const theme = themeMap[prev.theme];
      localStorage.setItem(storageKey, theme);
      return { theme };
    }),
}));
