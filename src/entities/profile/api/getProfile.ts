import { axiosInstance } from '@/shared/api';
import type { User } from '@/shared/model';

import type {
  FollowUserResponse,
  GetFollowersResponse,
  GetFollowingsResponse,
  GetUserProfileResponse,
  Profile,
  UnfollowUserResponse,
} from '../model/types';

export const profileApi = {
  getUserProfile: async (accountname: string): Promise<Profile> => {
    const { data } = await axiosInstance.get<GetUserProfileResponse>(`/api/profile/${accountname}`);
    return data.profile;
  },
  getFollowings: async (
    accountname: string,
    limit: number = 10,
    skip: number = 0,
  ): Promise<User[]> => {
    const { data } = await axiosInstance.get<GetFollowingsResponse>(
      `/api/profile/${accountname}/following`,
      { params: { limit, skip } },
    );
    return data.following || [];
  },
  getFollowers: async (
    accountname: string,
    limit: number = 10,
    skip: number = 0,
  ): Promise<User[]> => {
    const { data } = await axiosInstance.get<GetFollowersResponse>(
      `/api/profile/${accountname}/follower`,
      { params: { limit, skip } },
    );
    return data.follower || [];
  },

  followUser: async (accountname: string): Promise<User> => {
    const { data } = await axiosInstance.post<FollowUserResponse>(
      `/api/profile/${accountname}/follow`,
    );
    return data.profile;
  },

  unfollowUser: async (accountname: string): Promise<User> => {
    const { data } = await axiosInstance.delete<UnfollowUserResponse>(
      `/api/profile/${accountname}/unfollow`,
    );
    return data.profile;
  },
};
