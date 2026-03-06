import { useQuery } from '@tanstack/react-query';

import { getToken } from '@/shared/lib';
import { authKeys } from '@/shared/model';

import { authApi } from '../api/authApi';

export const useCheckToken = () => {
  return useQuery({
    queryKey: authKeys.session(),
    queryFn: () => authApi.checkToken(),
    enabled: !!getToken(),
  });
};
