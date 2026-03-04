// 게시물 목록/피드/상세 조회 및 생성·수정·삭제·좋아요 토글 등 react-query 훅을 제공하는 모듈
import { useRef } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

import { useReplaceNavigate } from '@/shared/lib';
import { type Post, postKeys } from '@/shared/model';

import { postApi } from './postApi';

// 타입가드: unknown -> Post[]
const isPostArray = (v: unknown): v is Post[] => Array.isArray(v);

// 타입가드: unknown -> { posts: Post[] }
const isPostsObject = (v: unknown): v is { posts: Post[] } => {
  if (!v || typeof v !== 'object') return false;
  const maybe = v as Record<string, unknown>;
  return Array.isArray(maybe.posts);
};

// lists 캐시에서 Post[]를 뽑아내는 헬퍼
const extractPosts = (data: unknown): Post[] | undefined => {
  if (isPostArray(data)) return data;
  if (isPostsObject(data)) return data.posts;
  return undefined;
};

// lists 캐시를 "동일한 형태"로 유지하면서 posts만 패치하는 헬퍼
const patchPostsListData = (data: unknown, patch: (posts: Post[]) => Post[]): unknown => {
  if (isPostArray(data)) return patch(data);
  if (isPostsObject(data)) return { ...data, posts: patch(data.posts) };
  return data;
};

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
  const location = useLocation();
  const { navigateBackOrTo } = useReplaceNavigate();

  // onMutate(optimistic)에서 결정한 액션을 mutationFn에서 쓰기 위한 저장소
  const likeActionRef = useRef(new Map<string, 'like' | 'unlike'>());

  const createMutation = useMutation({
    mutationFn: ({ content, image }: { content: string; image: string }) =>
      postApi.createPost({ post: { content, image } }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
      navigateBackOrTo(`/post/${data.id}`);
    },
  });

  const reportMutation = useMutation({
    mutationFn: (postId: string) => postApi.reportPost(postId),
  });

  const toggleLikeMutation = useMutation({
    mutationKey: postKeys.toggleLike(),

    mutationFn: async (postId: string) => {
      // onMutate에서 정해둔 action을 꺼내서 서버 호출
      const action = likeActionRef.current.get(postId);
      likeActionRef.current.delete(postId);

      if (action === 'unlike') {
        return postApi.unlikePost(postId);
      }
      if (action === 'like') {
        return postApi.togglePostLike(postId);
      }

      // 혹시 action을 못 구했을 때(예외 케이스)는 기존 toggle API로 fallback
      return postApi.togglePostLike(postId);
    },

    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({ queryKey: postKeys.detail(postId) });
      await queryClient.cancelQueries({ queryKey: postKeys.lists() });

      const prevDetail = queryClient.getQueryData<Post>(postKeys.detail(postId));
      const prevLists = queryClient.getQueriesData({ queryKey: postKeys.lists() });

      // "지금 누르기 전" 상태(=old 상태)에서 wasHearted를 계산
      let wasHearted: boolean | undefined = prevDetail?.hearted;

      if (typeof wasHearted !== 'boolean') {
        for (const [, data] of prevLists) {
          const posts = extractPosts(data);
          const found = posts?.find((p) => p.id === postId);
          if (found) {
            wasHearted = found.hearted;
            break;
          }
        }
      }

      // 서버 호출할 액션을 저장 (onMutate가 mutationFn보다 먼저 실행되므로 여기서 정해야 안전)
      likeActionRef.current.set(postId, wasHearted ? 'unlike' : 'like');

      // detail optimistic update
      queryClient.setQueryData(postKeys.detail(postId), (old: Post | undefined) =>
        old
          ? {
              ...old,
              heartCount: old.hearted ? old.heartCount - 1 : old.heartCount + 1,
              hearted: !old.hearted,
            }
          : old,
      );

      // lists optimistic update (Post[] or { posts: Post[] })
      queryClient.setQueriesData({ queryKey: postKeys.lists() }, (old: unknown) => {
        const patch = (posts: Post[]) =>
          posts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  heartCount: post.hearted ? post.heartCount - 1 : post.heartCount + 1,
                  hearted: !post.hearted,
                }
              : post,
          );

        return patchPostsListData(old, patch);
      });

      return { prevDetail, prevLists };
    },

    onError: (_err, postId, context) => {
      // 실패하면 롤백 + action도 정리
      likeActionRef.current.delete(postId);

      if (context?.prevDetail) {
        queryClient.setQueryData(postKeys.detail(context.prevDetail.id), context.prevDetail);
      }
      context?.prevLists?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSettled: (_data, _err, postId) => {
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });

      const isMutatingCount = queryClient.isMutating({ mutationKey: postKeys.toggleLike() });
      if (isMutatingCount <= 1) {
        queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      }
    },
  });

  // update는 Post 전체가 아니라 { content, image }만 받도록 변경
  const updateMutation = useMutation({
    mutationFn: ({ postId, post }: { postId: string; post: { content: string; image: string } }) =>
      postApi.updatePost({ postId, post }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
      navigateBackOrTo(`/post/${data.id}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (postId: string) => postApi.deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
      if (!location.pathname.includes('/profile')) {
        navigateBackOrTo('/profile');
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
