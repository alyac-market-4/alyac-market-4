import type { User } from '@/shared/model';

export interface Post {
  id: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  hearted: boolean;
  heartCount: number;
  commentCount: number;
  authorId: string;
  author: User;
}
