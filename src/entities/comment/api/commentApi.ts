import axiosInstance from '@/shared/api/axios';
import type { Comment } from '@/shared/model';

import type {
  CreateCommentRequest,
  CreateCommentResponse,
  DeleteCommentRequest,
  DeleteCommentResponse,
  GetPostCommentsResponse,
  ReportCommentRequest,
  ReportCommentResponse,
} from '../model/types';

export const commentApi = {
  getPostComments: async (
    postId: string,
    limit: number = 10,
    skip: number = 0,
  ): Promise<Comment[]> => {
    const { data } = await axiosInstance.get<GetPostCommentsResponse>(
      `/api/post/${postId}/comments`,
      {
        params: {
          limit,
          skip,
        },
      },
    );
    return data.comment;
  },

  createComment: async ({ postId, comment }: CreateCommentRequest): Promise<Comment> => {
    const { data } = await axiosInstance.post<CreateCommentResponse>(
      `/api/post/${postId}/comments`,
      {
        comment,
      },
    );
    return data.comment;
  },

  deleteComment: async ({ postId, commentId }: DeleteCommentRequest): Promise<string> => {
    const { data } = await axiosInstance.delete<DeleteCommentResponse>(
      `/api/post/${postId}/comments/${commentId}`,
    );
    return data.message;
  },

  reportComment: async ({ postId, commentId }: ReportCommentRequest): Promise<string> => {
    const { data } = await axiosInstance.post<ReportCommentResponse>(
      `/api/post/${postId}/comments/${commentId}/report`,
    );
    return data.report.content;
  },
};
