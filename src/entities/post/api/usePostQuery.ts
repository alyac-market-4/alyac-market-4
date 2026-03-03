import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import { type Post, postKeys } from '@/shared/model';

import { postApi } from './postApi';

export const useAllPostsQuery = (limit: number = 10, skip: number = 0) => {
  return useQuery({
    queryKey: postKeys.list(limit, skip),
    queryFn: () => postApi.getAllPosts(limit, skip),
  });
};

export const useFeedPostsQuery = (limit: number = 10, skip: number = 0) => {
  return useQuery({
    queryKey: postKeys.feed(limit, skip),
    queryFn: () => postApi.getFeedPosts(limit, skip),
  });
};

export const usePostDetailQuery = (postId: string) => {
  return useQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => postApi.getPostDetail(postId),
    enabled: !!postId,
  });
};

export const useUserPostsQuery = (accountname: string, limit: number = 10, skip: number = 0) => {
  return useQuery({
    queryKey: postKeys.user(accountname, limit, skip),
    queryFn: () => postApi.getUserPosts(accountname, limit, skip),
    enabled: !!accountname,
  });
};

export const usePostMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const createMutation = useMutation({
    mutationFn: ({ content, image }: { content: string; image: string }) =>
      postApi.createPost({ post: { content, image } }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
      navigate(`/post/${data.id}`);
    },
  });

  const reportMutation = useMutation({
    mutationFn: (postId: string) => postApi.reportPost(postId),
  });

  const toggleLikeMutation = useMutation({
    mutationFn: (postId: string) => postApi.togglePostLike(postId),
    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({ queryKey: postKeys.detail(postId) });
      await queryClient.cancelQueries({ queryKey: postKeys.lists() });
      const prevDetail = queryClient.getQueryData<Post>(postKeys.detail(postId));
      const prevLists = queryClient.getQueriesData<Post[]>({ queryKey: postKeys.lists() });
      queryClient.setQueryData(postKeys.detail(postId), (old: Post) =>
        old
          ? {
              ...old,
              heartCount: old.hearted ? old.heartCount - 1 : old.heartCount + 1,
              hearted: !old.hearted,
            }
          : old,
      );
      queryClient.setQueriesData<Post[]>({ queryKey: postKeys.lists() }, (old) =>
        old?.map((post) =>
          post.id === postId
            ? {
                ...post,
                heartCount: post.hearted ? post.heartCount - 1 : post.heartCount + 1,
                hearted: !post.hearted,
              }
            : post,
        ),
      );
      return { prevDetail, prevLists };
    },
    onError: (_, _2, context) => {
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

  // ✅ 여기만 핵심 수정: update는 Post 전체가 아니라 { content, image }만 받도록 변경
  const updateMutation = useMutation({
    mutationFn: ({ postId, post }: { postId: string; post: { content: string; image: string } }) =>
      postApi.updatePost({ postId, post }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
      navigate(`/post/${data.id}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (postId: string) => postApi.deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
      if (!location.pathname.includes('/profile')) {
        navigate('/profile');
      }
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: (postId: string) => postApi.unlikePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
    toggleLikeMutation,
    reportMutation,
    unlikeMutation,
  };
};
