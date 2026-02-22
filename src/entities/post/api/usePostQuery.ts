import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import type { Post } from '@/shared/model';

import { postKeys } from '../model/keys';
import { postApi } from './postApi';

export const useAllPostsQuery = (limit: number = 10, skip: number = 0) => {
  return useSuspenseQuery({
    queryKey: postKeys.list(limit, skip),
    queryFn: () => postApi.getAllPosts(limit, skip),
  });
};

export const useFeedPostsQuery = (limit: number = 10, skip: number = 0) => {
  return useSuspenseQuery({
    queryKey: postKeys.feed(limit, skip),
    queryFn: () => postApi.getFeedPosts(limit, skip),
  });
};

export const usePostDetailQuery = (postId: string) => {
  return useSuspenseQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => postApi.getPostDetail(postId),
  });
};

export const useUserPostsQuery = (accountname: string, limit: number = 10, skip: number = 0) => {
  return useSuspenseQuery({
    queryKey: postKeys.user(accountname, limit, skip),
    queryFn: () => postApi.getUserPosts(accountname, limit, skip),
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
