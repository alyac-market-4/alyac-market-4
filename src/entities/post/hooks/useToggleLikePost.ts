import { type InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';

import { type Post, postKeys } from '@/shared/model';

import { postApi } from '../api/postApi';

export const useToggleLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: postKeys.toggleLike(),
    mutationFn: (postId: string) => postApi.togglePostLike(postId),
    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({ queryKey: postKeys.detail(postId) });
      await queryClient.cancelQueries({ queryKey: postKeys.lists() });
      const prevDetail = queryClient.getQueryData<Post>(postKeys.detail(postId));
      const prevLists = queryClient.getQueriesData<Post[]>({ queryKey: postKeys.lists() });
      queryClient.setQueryData(postKeys.detail(postId), (old: Post) => {
        if (!old) return old;
        return {
          ...old,
          heartCount: old.hearted ? old.heartCount - 1 : old.heartCount + 1,
          hearted: !old.hearted,
        };
      });
      queryClient.setQueriesData<InfiniteData<Post[]>>({ queryKey: postKeys.lists() }, (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: Post[]) =>
            page.map((post: Post) =>
              post.id === postId
                ? {
                    ...post,
                    heartCount: post.hearted ? post.heartCount - 1 : post.heartCount + 1,
                    hearted: !post.hearted,
                  }
                : post,
            ),
          ),
        };
      });
      return { prevDetail, prevLists };
    },
    onError: (error, _2, context) => {
      console.log(error);
      if (context?.prevDetail) {
        queryClient.setQueryData(postKeys.detail(context.prevDetail.id), context.prevDetail);
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
