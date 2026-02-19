import { useQuery } from '@tanstack/react-query';

import { getUser } from '@/entities/user/api/userApi';

export const useUserQuery = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
  });
};
