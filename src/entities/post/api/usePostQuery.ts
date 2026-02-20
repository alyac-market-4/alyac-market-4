import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { postApi } from '@/entities/post';
import { postKeys } from '@/entities/post/model/keys';
import type { Post } from '@/shared/model';

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

  const createMutation = useMutation({
    mutationFn: ({ content, image }: { content: string; image: string }) =>
      postApi.createPost({ post: { content, image } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
    },
  });

  const reportMutation = useMutation({
    mutationFn: (postId: string) => postApi.reportPost(postId),
    onSuccess: (post) => {
      alert(`신고 접수: ${post}`);
    },
  });

  const toggleLikeMutation = useMutation({
    mutationFn: (postId: string) => postApi.togglePostLike(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ postId, post }: { postId: string; post: Post }) =>
      postApi.updatePost({ postId, post }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (postId: string) => postApi.deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
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
