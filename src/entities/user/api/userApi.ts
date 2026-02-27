// src/entities/user/api/userApi.ts
import { z } from 'zod';

import { axiosInstance } from '@/shared/api';
import type { User } from '@/shared/model';

import type {
  UpdateProfileRequest,
  UserResponse,
  ValidateAccountnameRequest,
  ValidateAccountnameResponse,
  ValidateEmailRequest,
  ValidateEmailResponse,
} from '../model/types';

type SearchUserResponse = User[] | { users: User[] } | { user: User[] };

/**
 * 최소 Zod: 배열 형태만 검증
 */
const searchUserSchema = z
  .union([
    z.array(z.any()),
    z.object({ users: z.array(z.any()) }),
    z.object({ user: z.array(z.any()) }),
  ])
  .transform((val) => {
    if (Array.isArray(val)) return val;
    if ('users' in val) return val.users;
    return val.user;
  });

export const userApi = {
  getMyInfo: async (): Promise<User> => {
    const { data } = await axiosInstance.get<UserResponse>(`/api/user/myinfo`);
    return data.user;
  },

  // ✅ 여기만 Zod 추가
  searchUser: async (keyword: string): Promise<User[]> => {
    const { data } = await axiosInstance.get<SearchUserResponse>(`/api/user/searchuser`, {
      params: { keyword },
    });

    const parsed = searchUserSchema.safeParse(data);
    if (!parsed.success) {
      console.error('Invalid searchUser response:', parsed.error);
      return [];
    }

    return parsed.data as User[];
  },

  validateEmail: async (email: ValidateEmailRequest): Promise<ValidateEmailResponse> => {
    const { data } = await axiosInstance.post<ValidateEmailResponse>(`/api/user/emailvalid`, email);
    return data;
  },

  validateAccountname: async (
    accountname: ValidateAccountnameRequest,
  ): Promise<ValidateAccountnameResponse> => {
    const { data } = await axiosInstance.post<ValidateAccountnameResponse>(
      `/api/user/accountnamevalid`,
      accountname,
    );
    return data;
  },

  updateProfile: async (userInfo: UpdateProfileRequest): Promise<User> => {
    const { data } = await axiosInstance.put<User>(`/api/user`, userInfo);
    return data;
  },
};
