import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

import { useReplaceNavigate } from '@/shared/lib';
import { postKeys } from '@/shared/model';

import { postApi } from '../api/postApi';

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const { replaceNavigate } = useReplaceNavigate();

  return useMutation({
    mutationFn: (postId: string) => postApi.deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      if (!location.pathname.includes('/profile')) {
        replaceNavigate('/profile');
      }
    },
  });
};
