import { useQuery } from '@tanstack/react-query';

import { profileKeys } from '@/shared/model';

import { profileApi } from '../api/profileApi';

export const useUserProfile = (accountname: string) => {
  return useQuery({
    queryKey: profileKeys.detail(accountname),
    queryFn: () => profileApi.getUserProfile(accountname),
    enabled: !!accountname,
  });
};
