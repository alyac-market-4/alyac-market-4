import { axiosInstance } from '@/shared/api';

import type { ProfileUpdateRequest, ProfileUpdateResponse } from '../model/types';

export const profileUpdateApi = {
  profileUpdate: async (userInfo: ProfileUpdateRequest): Promise<ProfileUpdateResponse> => {
    const { data } = await axiosInstance.put<ProfileUpdateResponse>(`/api/user`, userInfo);
    return data;
  },
};
