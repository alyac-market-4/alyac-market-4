import { useMutation } from '@tanstack/react-query';

import { commentApi } from '../api/commentApi';
import type { DeleteCommentRequest } from '../model/types';

export const useReportComment = () => {
  return useMutation({
    mutationFn: ({ postId, commentId }: DeleteCommentRequest) =>
      commentApi.reportComment({ postId, commentId }),
  });
};
