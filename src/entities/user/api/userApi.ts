import axiosInstance from '@/shared/api/axios';
import type { User } from '@/shared/model';

import type {
  UpdateProfileRequest,
  UserResponse,
  ValidateAccountnameRequest,
  ValidateAccountnameResponse,
  ValidateEmailRequest,
  ValidateEmailResponse,
} from '../model/types';

export const userApi = {
  getMyInfo: async (): Promise<User> => {
    const { data } = await axiosInstance.get<UserResponse>(`/api/user/myinfo`);
    return data.user;
  },
  searchUser: async (keyword: string): Promise<User[]> => {
    const { data } = await axiosInstance.get<User[]>(`/api/user/search`, {
      params: { keyword },
    });
    return data;
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
