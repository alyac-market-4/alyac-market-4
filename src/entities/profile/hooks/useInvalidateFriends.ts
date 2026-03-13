import { useQueryClient } from '@tanstack/react-query';

import { profileKeys } from '../model/keys';

export const useInvalidateFriends = () => {
  const queryClient = useQueryClient();
  return (accountname: string) =>
    queryClient.invalidateQueries({ queryKey: profileKeys.detail(accountname) });
};
