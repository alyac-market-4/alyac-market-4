import { axiosInstance } from '@/shared/api';
import type { Post } from '@/shared/model/post';

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
  getAllPosts: async (limit: number = 10, skip: number = 0): Promise<Post[]> => {
    const { data } = await axiosInstance.get<FlexiblePostsResponse>('/api/post', {
      params: { limit, skip },
    });
    if (isKeyNamePosts(data)) {
      return data.posts;
    }
    return data.post;
  },

  getFeedPosts: async (limit: number = 10, skip: number = 0): Promise<Post[]> => {
    const { data } = await axiosInstance.get<FlexiblePostsResponse>('/api/post/feed', {
      params: { limit, skip },
    });
    if (isKeyNamePosts(data)) {
      return data.posts;
    }
    return data.post;
  },

  getPostDetail: async (postId: string): Promise<Post> => {
    const { data } = await axiosInstance.get<PostResponse>(`/api/post/${postId}`);
    return data.post;
  },

  getUserPosts: async (
    accountname: string,
    limit: number = 10,
    skip: number = 0,
  ): Promise<Post[]> => {
    const { data } = await axiosInstance.get<FlexiblePostsResponse>(
      `/api/post/${accountname}/userpost`,
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
    const { data } = await axiosInstance.post<PostResponse>('/api/post', post);
    return data.post;
  },

  reportPost: async (postId: string): Promise<string> => {
    const { data } = await axiosInstance.post<ReportPostResponse>(`/api/post/${postId}/report`);
    return data.report.post;
  },

  togglePostLike: async (postId: string): Promise<Post> => {
    const { data } = await axiosInstance.post<TogglePostLikeResponse>(`/api/post/${postId}/heart`);
    return data.post;
  },

  // ✅ 여기 핵심 수정: update도 create처럼 { post: { ... } }로 감싸서 전송
  updatePost: async ({ postId, post }: UpdatePostRequest): Promise<Post> => {
    const { data } = await axiosInstance.put<PostResponse>(`/api/post/${postId}`, { post });
    return data.post;
  },

  deletePost: async (postId: string): Promise<string> => {
    const { data } = await axiosInstance.delete<DeletePostResponse>(`/api/post/${postId}`);
    return data.message;
  },

  unlikePost: async (postId: string): Promise<Post> => {
    const { data } = await axiosInstance.delete<UnlikePostResponse>(`/api/post/${postId}/unheart`);
    return data.post;
  },
};

const isKeyNamePosts = (data: FlexiblePostsResponse): data is { posts: Post[] } => {
  return 'posts' in data;
};
