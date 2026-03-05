// src/entities/auth/lib/useAuth.ts
import { useQueryClient } from '@tanstack/react-query';

import { removeToken, useReplaceNavigate } from '@/shared/lib';

import { useAuthStore } from '../model/authStore';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { replaceNavigate } = useReplaceNavigate();
  const { isAuthenticated, setAuthenticated, logoutAction } = useAuthStore();

  const logout = () => {
    removeToken();
    queryClient.clear();
    logoutAction();
    replaceNavigate('/sign-in');
  };

  return { isAuthenticated, setAuthenticated, logout };
};
