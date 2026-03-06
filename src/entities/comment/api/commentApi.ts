import { axiosInstance } from '@/shared/api';
import type { Comment } from '@/shared/model';
import { API_ENDPOINTS } from '@/shared/model';

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
    limit: number = 5,
    skip: number = 0,
  ): Promise<Comment[]> => {
    const { data } = await axiosInstance.get<GetPostCommentsResponse>(
      API_ENDPOINTS.POST.COMMENTS.GET_LIST(postId),
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
      API_ENDPOINTS.POST.COMMENTS.CREATE(postId),
      {
        comment,
      },
    );
    return data.comment;
  },

  deleteComment: async ({ postId, commentId }: DeleteCommentRequest): Promise<string> => {
    const { data } = await axiosInstance.delete<DeleteCommentResponse>(
      API_ENDPOINTS.POST.COMMENTS.DELETE(postId, commentId),
    );
    return data.message;
  },

  reportComment: async ({ postId, commentId }: ReportCommentRequest): Promise<string> => {
    const { data } = await axiosInstance.post<ReportCommentResponse>(
      API_ENDPOINTS.POST.COMMENTS.REPORT(postId, commentId),
    );
    return data.report.content;
  },
};
