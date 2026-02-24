import type { Comment, CommentContent } from '@/shared/model';

export interface CreateCommentRequest {
  postId: string;
  comment: CommentContent;
}

export interface DeleteCommentRequest {
  postId: string;
  commentId: string;
}
export interface ReportCommentRequest {
  postId: string;
  commentId: string;
}

export interface CreateCommentResponse {
  comment: Comment;
}

export interface GetPostCommentsResponse {
  comment: Comment[];
}

export interface DeleteCommentResponse {
  message: string;
}

export interface ReportCommentResponse {
  report: CommentContent;
}

export interface CommentSubmitData {
  postId: string;
  content: string;
}
