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

export const userApi = {
  getMyInfo: async (): Promise<User> => {
    const { data } = await axiosInstance.get<UserResponse>(`/api/user/myinfo`);
    return data.user;
  },

  // ✅ 여기만 핵심 수정: /search -> /searchuser
  searchUser: async (keyword: string): Promise<User[]> => {
    const { data } = await axiosInstance.get<SearchUserResponse>(`/api/user/searchuser`, {
      params: { keyword },
    });

    // 서버 응답 형태가 어떤 경우든 User[]로 통일
    if (Array.isArray(data)) return data;
    if ('users' in data && Array.isArray(data.users)) return data.users;
    if ('user' in data && Array.isArray(data.user)) return data.user;

    return [];
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
