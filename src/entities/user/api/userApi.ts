import type { UserResponse } from '@/entities/user';
import axiosInstance from '@/shared/api/axios';
import type { User } from '@/shared/model';

export const getUser = async (): Promise<User> => {
  const { data } = await axiosInstance.get<UserResponse>(`/api/user/myinfo`);
  return data.user;
};
