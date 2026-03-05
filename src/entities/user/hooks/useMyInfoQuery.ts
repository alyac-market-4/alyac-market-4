import { useQuery } from '@tanstack/react-query';

import { userKeys } from '@/shared/model';

import { userApi } from '../api/userApi';

/**
 * @deprecated useUserProfileQuery(getTokenUserInfo().accountname)를 사용하세요.
 */
export const useMyInfoQuery = () => {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: () => userApi.getMyInfo(),
  });
};
