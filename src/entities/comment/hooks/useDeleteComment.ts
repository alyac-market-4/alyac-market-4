import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postKeys } from '@/shared/model';

import { commentApi } from '../api/commentApi';
import { commentKeys } from '../model/keys';
import type { DeleteCommentRequest } from '../model/types';

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, commentId }: DeleteCommentRequest) =>
      commentApi.deleteComment({ postId, commentId }),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.all });
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
    },
  });
};
