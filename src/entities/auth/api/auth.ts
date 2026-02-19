import type { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from '@/entities/auth';
import axiosInstance from '@/shared/api/axios';

export const signIn = async (data: SignInRequest): Promise<SignInResponse> => {
  const response = await axiosInstance.post('/api/user/signin', data);
  return response.data;
};

export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  const response = await axiosInstance.post<SignUpResponse>('/api/user/signup', data);
  return response.data;
};
