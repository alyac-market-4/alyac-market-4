import { useQuery } from '@tanstack/react-query';

import { profileApi } from '../api/profileApi';
import { profileKeys } from '../model/keys';

export const useUserProfile = (accountname: string) => {
  return useQuery({
    queryKey: profileKeys.detail(accountname),
    queryFn: () => profileApi.getUserProfile(accountname),
    enabled: !!accountname,
  });
};
