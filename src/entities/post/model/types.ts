import type { Post } from '@/shared/model/post';

export interface CreatePostRequest {
  post: { content: string; image: string };
}

export interface UpdatePostRequest {
  postId: string;
  post: { content: string; image: string };
}

export interface PostResponse {
  post: Post;
}

export interface ReportPostResponse {
  report: {
    post: string;
  };
}

export interface TogglePostLikeResponse {
  post: Post;
}

export interface DeletePostResponse {
  message: string;
}

export interface UnlikePostResponse {
  post: Post;
}

export type FlexiblePostsResponse = { post: Post[] } | { posts: Post[] };
