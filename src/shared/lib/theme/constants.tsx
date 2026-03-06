import { Monitor, Moon, Sun } from 'lucide-react';

import type { Theme } from './types';

export const themeIcons = {
  system: <Monitor />,
  light: <Sun />,
  dark: <Moon />,
};

export const storageKey = 'ui-theme';
export const defaultTheme: Theme = 'system';

export const themeMap = {
  system: 'light',
  light: 'dark',
  dark: 'system',
} as const;
