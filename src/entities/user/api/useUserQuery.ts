import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { userKeys } from '@/shared/model';

import type { UpdateProfileRequest } from '../model/types';
import { userApi } from './userApi';

export const useMyInfoQuery = () => {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: () => userApi.getMyInfo(),
  });
};
export const useSearchUserQuery = (keyword: string) => {
  return useQuery({
    queryKey: userKeys.search(keyword),
    queryFn: () => userApi.searchUser(keyword),
    enabled: !!keyword,
  });
};

export const useUserMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const validateEmailMutation = useMutation({
    mutationFn: (email: string) => userApi.validateEmail({ user: { email } }),
  });
  const validateAccountnameMutation = useMutation({
    mutationFn: (accountname: string) => userApi.validateAccountname({ user: { accountname } }),
  });

  const updateProfileMutation = useMutation({
    mutationFn: (userInfo: UpdateProfileRequest) => userApi.updateProfile(userInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
      navigate(`/profile`);
    },
  });

  return {
    validateEmailMutation,
    validateAccountnameMutation,
    updateProfileMutation,
  };
};
