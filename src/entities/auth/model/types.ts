import type { Token, User } from '@/shared/model';

export interface CheckTokenResponse {
  isValid: boolean;
}

export interface SignInRequest {
  user: {
    email: string;
    password: string;
  };
}

export interface SignInResponse {
  user: User & Token;
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

export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  accountname: string;
  intro: string;
  image: string;
}

export interface SignUpResponse {
  message: string;
  user: User;
}
