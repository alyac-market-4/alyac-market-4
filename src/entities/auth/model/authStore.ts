import { create } from 'zustand';

import { getToken } from '@/shared/lib';

interface AuthState {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  logoutAction: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!getToken(),
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  logoutAction: () => {
    set({ isAuthenticated: false });
  },
}));
