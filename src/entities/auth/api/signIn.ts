import type { SignInRequest, SignInResponse } from '@/entities/auth';
import axiosInstance from '@/shared/api/axios';

export const signIn = async (data: SignInRequest): Promise<SignInResponse> => {
  const response = await axiosInstance.post('/user/login', data);
  return response.data;
};
