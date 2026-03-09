import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postKeys } from '@/shared/model';

import { postApi } from '../api/postApi';

export const useUnlikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => postApi.unlikePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
};
