import type { User } from './user';

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
