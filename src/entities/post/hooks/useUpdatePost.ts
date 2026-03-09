import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useReplaceNavigate } from '@/shared/lib';
import { postKeys } from '@/shared/model';

import { postApi } from '../api/postApi';

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const { replaceNavigate } = useReplaceNavigate();

  return useMutation({
    mutationFn: ({ postId, post }: { postId: string; post: { content: string; image: string } }) =>
      postApi.updatePost({ postId, post }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      replaceNavigate(`/post/${data.id}`);
    },
  });
};
