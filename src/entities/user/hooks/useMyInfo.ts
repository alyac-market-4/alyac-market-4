import { useQuery } from '@tanstack/react-query';

import { userApi } from '../api/userApi';
import { userKeys } from '../model/keys';

/**
 * @deprecated useUserProfile(getTokenUserInfo().accountname)를 사용하세요.
 */
export const useMyInfo = () => {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: () => userApi.getMyInfo(),
  });
};
