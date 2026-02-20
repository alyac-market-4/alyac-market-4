import type { User, UserBase } from '@/shared/model';

export interface UserResponse {
  user: User;
}

export interface SignUpRequest {
  user: UserBase & {
    password: string;
  };
}

export interface SignUpResponse {
  user: User & {
    message: string;
  };
}
