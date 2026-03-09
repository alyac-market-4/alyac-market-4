import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useReplaceNavigate } from '@/shared/lib';
import { postKeys } from '@/shared/model';

import { postApi } from '../api/postApi';

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { replaceNavigate } = useReplaceNavigate();

  return useMutation({
    mutationFn: ({ content, image }: { content: string; image: string }) =>
      postApi.createPost({ post: { content, image } }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      replaceNavigate(`/post/${data.id}`);
    },
  });
};
