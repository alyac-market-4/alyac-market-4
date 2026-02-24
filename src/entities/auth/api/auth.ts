import { axiosInstance } from '@/shared/api';
import type { Token } from '@/shared/model';

import type {
  CheckTokenResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from '../model/types';

export const authApi = {
  checkToken: async (): Promise<boolean> => {
    const { data } = await axiosInstance.get<CheckTokenResponse>(`/api/user/checktoken`);
    return data.isValid;
  },

  signUp: async (userInfo: SignUpRequest): Promise<SignUpResponse> => {
    const { data } = await axiosInstance.post<SignUpResponse>(`/api/user`, userInfo);
    return data;
  },
  signIn: async (userInfo: SignInRequest): Promise<SignInResponse> => {
    const { data } = await axiosInstance.post<SignInResponse>(`/api/user/signin`, userInfo);
    return data;
  },
  refreshToken: async (token: string): Promise<Token> => {
    const { data } = await axiosInstance.post<Token>(`/api/user/refresh`, token);
    return data;
  },
};
