import { useQuery } from '@tanstack/react-query';

import { getToken } from '@/shared/lib';

import { authApi } from '../api/authApi';
import { authKeys } from '../model/keys';

export const useCheckToken = () => {
  return useQuery({
    queryKey: authKeys.session(),
    queryFn: () => authApi.checkToken(),
    enabled: !!getToken(),
  });
};
