import { useQuery } from '@tanstack/react-query';

import { getProfile } from '@/entities/profile/api/getProfile';

export const useProfileQuery = (accountname: string) => {
  return useQuery({
    queryKey: ['profile', accountname],
    queryFn: () => getProfile(accountname),
    enabled: !!accountname,
  });
};
