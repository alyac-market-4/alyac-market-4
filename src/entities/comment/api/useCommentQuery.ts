import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { commentApi } from '@/entities/comment/api/commentApi';
import { commentKeys } from '@/entities/comment/model/keys';
import type { DeleteCommentRequest } from '@/entities/comment/model/types';

export const usePostCommentsQuery = (postId: string, limit: number = 10, skip: number = 0) => {
  return useQuery({
    queryKey: commentKeys.list(postId, limit, skip),
    queryFn: () => commentApi.getPostComments(postId, limit, skip),
    enabled: !!postId,
  });
};

export const useCommentMutation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: commentApi.createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.all });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ postId, commentId }: DeleteCommentRequest) =>
      commentApi.deleteComment({ postId, commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.all });
    },
  });

  const reportMutation = useMutation({
    mutationFn: ({ postId, commentId }: DeleteCommentRequest) =>
      commentApi.reportComment({ postId, commentId }),
    onSuccess: () => {
      alert('신고되었습니다.');
    },
  });

  return { createMutation, deleteMutation, reportMutation };
};
