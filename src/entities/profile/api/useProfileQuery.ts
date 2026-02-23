import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { profileKeys } from '@/shared/model';

import { profileApi } from './getProfile';

export const useUserProfileQuery = (accountname: string) => {
  return useQuery({
    queryKey: profileKeys.detail(accountname),
    queryFn: () => profileApi.getUserProfile(accountname),
    enabled: !!accountname,
  });
};
export const useFollowingsQuery = (accountname: string, limit: number = 10, skip: number = 0) => {
  return useQuery({
    queryKey: profileKeys.followings(accountname, limit, skip),
    queryFn: () => profileApi.getFollowings(accountname, limit, skip),
    enabled: !!accountname,
  });
};
export const useFollowersQuery = (accountname: string, limit: number = 10, skip: number = 0) => {
  return useQuery({
    queryKey: profileKeys.followers(accountname, limit, skip),
    queryFn: () => profileApi.getFollowers(accountname, limit, skip),
    enabled: !!accountname,
  });
};

export const useProfileMutation = () => {
  const queryClient = useQueryClient();

  const followMutation = useMutation({
    mutationFn: (accountname: string) => profileApi.followUser(accountname),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.all });
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: (accountname: string) => profileApi.unfollowUser(accountname),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.all });
    },
  });

  return {
    followMutation,
    unfollowMutation,
  };
};
