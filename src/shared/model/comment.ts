import type { User } from '@/shared/model';

export interface CommentContent {
  content: string;
}

export interface Comment extends CommentContent {
  id: string;
  createdAt: Date;
  postId: string;
  authorId: string;
  author: User;
}
