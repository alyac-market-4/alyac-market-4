import { axiosInstance } from '@/shared/api';
import type { Token } from '@/shared/model';
import { API_ENDPOINTS } from '@/shared/model';

import type {
  CheckTokenResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from '../model/types';

export const authApi = {
  checkToken: async (): Promise<boolean> => {
    const { data } = await axiosInstance.get<CheckTokenResponse>(API_ENDPOINTS.USER.CHECK_TOKEN);
    return data.isValid;
  },

  signUp: async (userInfo: SignUpRequest): Promise<SignUpResponse> => {
    const { data } = await axiosInstance.post<SignUpResponse>(
      API_ENDPOINTS.USER.REGISTER,
      userInfo,
    );
    return data;
  },
  signIn: async (userInfo: SignInRequest): Promise<SignInResponse> => {
    const { data } = await axiosInstance.post<SignInResponse>(API_ENDPOINTS.USER.SIGN_IN, userInfo);
    return data;
  },
  refreshToken: async (token: string): Promise<Token> => {
    const { data } = await axiosInstance.post<Token>(API_ENDPOINTS.USER.REFRESH_TOKEN, token);
    return data;
  },
};
