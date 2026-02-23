import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { commentKeys, postKeys } from '@/shared/model';

import type { CommentSubmitData, DeleteCommentRequest } from '../model/types';
import { commentApi } from './commentApi';

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
    mutationFn: ({ postId, content }: CommentSubmitData) =>
      commentApi.createComment({ postId, comment: { content } }),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.all });
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ postId, commentId }: DeleteCommentRequest) =>
      commentApi.deleteComment({ postId, commentId }),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.all });
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
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
