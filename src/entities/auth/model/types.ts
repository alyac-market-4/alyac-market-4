import type { User } from '@/shared/model';

export interface SignInRequest {
  user: {
    email: string;
    password: string;
  };
}

export interface SignInResponse {
  user: User & {
    accessToken: string;
    refreshToken: string;
  };
}

export interface SignUpRequest {
  user: {
    username: string;
    email: string;
    password: string;
    accountname: string;
    intro: string;
    image: string;
  };
}

export interface SignUpResponse {
  user: User & {
    message: string;
  };
}
