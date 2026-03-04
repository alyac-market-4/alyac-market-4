// 유저 검색/내정보/프로필 업데이트 등 유저 관련 react-query 훅을 제공하는 모듈
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { profileKeys, userKeys } from '@/shared/model';

import type { UpdateProfileRequest } from '../model/types';
import { userApi } from './userApi';

/**
 * @deprecated useUserProfileQuery(getTokenUserInfo().accountname)를 사용하세요.
 */
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

  const validateEmailMutation = useMutation({
    mutationFn: (email: string) => userApi.validateEmail({ user: { email } }),
  });
  const validateAccountnameMutation = useMutation({
    mutationFn: (accountname: string) => userApi.validateAccountname({ user: { accountname } }),
  });

  const updateProfileMutation = useMutation({
    mutationFn: (userInfo: UpdateProfileRequest) => userApi.updateProfile(userInfo),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: profileKeys.detail(variables.user.accountname) });
    },
  });

  return {
    validateEmailMutation,
    validateAccountnameMutation,
    updateProfileMutation,
  };
};
