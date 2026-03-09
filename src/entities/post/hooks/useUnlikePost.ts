import { type InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';

import { type Post, postKeys } from '@/shared/model';

import { postApi } from '../api/postApi';

export const useUnlikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: postKeys.toggleLike(),
    mutationFn: (postId: string) => postApi.unlikePost(postId),
    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({ queryKey: postKeys.detail(postId) });
      await queryClient.cancelQueries({ queryKey: postKeys.lists() });
      const prevDetail = queryClient.getQueryData<Post>(postKeys.detail(postId));
      const prevLists = queryClient.getQueriesData<InfiniteData<Post[]>>({
        queryKey: postKeys.lists(),
      });
      queryClient.setQueryData(postKeys.detail(postId), (old: Post | undefined) => {
        if (!old) return old;
        return {
          ...old,
          heartCount: Math.max(0, old.heartCount - 1),
          hearted: false,
        };
      });
      queryClient.setQueriesData<InfiniteData<Post[]>>({ queryKey: postKeys.lists() }, (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: Post[]) =>
            page.map((post: Post) =>
              post.id === postId
                ? { ...post, heartCount: Math.max(0, post.heartCount - 1), hearted: false }
                : post,
            ),
          ),
        };
      });
      return { prevDetail, prevLists };
    },
    onError: (_, postId, context) => {
      if (context?.prevDetail) {
        queryClient.setQueryData(postKeys.detail(postId), context.prevDetail);
      }
      context?.prevLists?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
    onSettled: (_, _2, postId) => {
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
      const isMutating = queryClient.isMutating({ mutationKey: postKeys.toggleLike() });
      if (isMutating <= 1) {
        queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      }
    },
  });
};
