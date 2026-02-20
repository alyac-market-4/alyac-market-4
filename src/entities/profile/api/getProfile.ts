import type { Profile, ProfileResponse } from '@/entities/profile';
import axiosInstance from '@/shared/api/axios';

export const getProfile = async (accountname: string): Promise<Profile> => {
  const { data } = await axiosInstance.get<ProfileResponse>(`/api/profile/${accountname}`);
  return data.profile;
};
