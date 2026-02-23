import type { User } from '@/shared/model';

export interface UserResponse {
  user: User;
}

export interface ValidateEmailRequest {
  user: {
    email: string;
  };
}
export interface ValidateEmailResponse {
  ok: boolean;
  message: string;
}

export interface ValidateAccountnameRequest {
  user: {
    accountname: string;
  };
}
export interface ValidateAccountnameResponse {
  ok: boolean;
  message: string;
}

export interface UpdateProfileRequest {
  user: {
    username: string;
    accountname: string;
    intro: string;
    image: string;
  };
}
