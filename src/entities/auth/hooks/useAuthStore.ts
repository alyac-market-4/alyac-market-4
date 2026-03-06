// src/entities/auth/lib/useAuth.ts
import { useQueryClient } from '@tanstack/react-query';

import { removeToken, useReplaceNavigate } from '@/shared/lib';

import { useAuthStore } from '../model/authStore';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { replaceNavigate } = useReplaceNavigate();
  const { isAuthenticated, setAuthenticated, logoutAction } = useAuthStore();

  const logout = () => {
    replaceNavigate('/');
    removeToken();
    queryClient.clear();
    logoutAction();
  };

  return { isAuthenticated, setAuthenticated, logout };
};
