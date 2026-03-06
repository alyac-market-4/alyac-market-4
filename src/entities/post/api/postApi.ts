// 게시물 관련 REST API 호출(전체/피드/상세/작성/수정/삭제/좋아요)을 axios로 래핑한 모듈
import { axiosInstance } from '@/shared/api';
import { API_ENDPOINTS } from '@/shared/model';
import type { Post } from '@/shared/model';

import type {
  CreatePostRequest,
  DeletePostResponse,
  FlexiblePostsResponse,
  PostResponse,
  ReportPostResponse,
  TogglePostLikeResponse,
  UnlikePostResponse,
  UpdatePostRequest,
} from '../model/types';

// TODO: 백엔드 개선 시 FlexiblePostsResponse 제거
export const postApi = {
  getAllPosts: async (limit: number = 5, skip: number = 0): Promise<Post[]> => {
    const { data } = await axiosInstance.get<FlexiblePostsResponse>(API_ENDPOINTS.POST.GET_ALL, {
      params: { limit, skip },
    });
    if (isKeyNamePosts(data)) {
      return data.posts;
    }
    return data.post;
  },

  getFeedPosts: async (limit: number = 5, skip: number = 0): Promise<Post[]> => {
    const { data } = await axiosInstance.get<FlexiblePostsResponse>(API_ENDPOINTS.POST.GET_FEED, {
      params: { limit, skip },
    });
    if (isKeyNamePosts(data)) {
      return data.posts;
    }
    return data.post;
  },

  getPostDetail: async (postId: string): Promise<Post> => {
    const { data } = await axiosInstance.get<PostResponse>(API_ENDPOINTS.POST.GET_DETAIL(postId));
    return data.post;
  },

  getUserPosts: async (
    accountname: string,
    limit: number = 5,
    skip: number = 0,
  ): Promise<Post[]> => {
    const { data } = await axiosInstance.get<FlexiblePostsResponse>(
      API_ENDPOINTS.POST.GET_USER_POSTS(accountname),
      {
        params: { limit, skip },
      },
    );
    if (isKeyNamePosts(data)) {
      return data.posts;
    }
    return data.post;
  },

  createPost: async (post: CreatePostRequest): Promise<Post> => {
    const { data } = await axiosInstance.post<PostResponse>(API_ENDPOINTS.POST.CREATE, post);
    return data.post;
  },

  reportPost: async (postId: string): Promise<string> => {
    const { data } = await axiosInstance.post<ReportPostResponse>(
      API_ENDPOINTS.POST.REPORT(postId),
    );
    return data.report.post;
  },

  togglePostLike: async (postId: string): Promise<Post> => {
    const { data } = await axiosInstance.post<TogglePostLikeResponse>(
      API_ENDPOINTS.POST.TOGGLE_HEART(postId),
    );
    return data.post;
  },

  updatePost: async ({ postId, post }: UpdatePostRequest): Promise<Post> => {
    const { data } = await axiosInstance.put<PostResponse>(API_ENDPOINTS.POST.UPDATE(postId), {
      post,
    });
    return data.post;
  },

  deletePost: async (postId: string): Promise<string> => {
    const { data } = await axiosInstance.delete<DeletePostResponse>(
      API_ENDPOINTS.POST.DELETE(postId),
    );
    return data.message;
  },

  unlikePost: async (postId: string): Promise<Post> => {
    const { data } = await axiosInstance.delete<UnlikePostResponse>(
      API_ENDPOINTS.POST.UNHEART(postId),
    );
    return data.post;
  },
};

const isKeyNamePosts = (data: FlexiblePostsResponse): data is { posts: Post[] } => {
  return 'posts' in data;
};
