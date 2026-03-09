import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postKeys } from '@/shared/model';

import { commentApi } from '../api/commentApi';
import { commentKeys } from '../model/keys';
import type { CommentSubmitData } from '../model/types';

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, content }: CommentSubmitData) =>
      commentApi.createComment({ postId, comment: { content } }),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.all });
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
    },
  });
};
