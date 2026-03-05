import { useMutation } from '@tanstack/react-query';

import { postApi } from '../api/postApi';

export const useReportPost = () => {
  return useMutation({
    mutationFn: (postId: string) => postApi.reportPost(postId),
  });
};
