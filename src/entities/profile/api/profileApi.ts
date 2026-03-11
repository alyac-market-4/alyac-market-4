import { axiosInstance } from '@/shared/api';
import { API_ENDPOINTS, type User, type UserWithIsFollow } from '@/shared/model';

import type {
  FollowUserResponse,
  GetFollowersResponse,
  GetFollowingsResponse,
  GetUserProfileResponse,
  Profile,
  UnfollowUserResponse,
  UpdateProfileRequest,
} from '../model/types';

export const profileApi = {
  getUserProfile: async (accountname: string): Promise<Profile> => {
    const { data } = await axiosInstance.get<GetUserProfileResponse>(
      API_ENDPOINTS.PROFILE.GET_PROFILE(accountname),
    );
    return data.profile;
  },
  getFollowings: async (
    accountname: string,
    limit: number = 5,
    skip: number = 0,
  ): Promise<UserWithIsFollow[]> => {
    const { data } = await axiosInstance.get<GetFollowingsResponse>(
      API_ENDPOINTS.PROFILE.GET_FOLLOWINGS(accountname),
      { params: { limit, skip } },
    );
    return data.following || [];
  },
  getFollowers: async (
    accountname: string,
    limit: number = 5,
    skip: number = 0,
  ): Promise<UserWithIsFollow[]> => {
    const { data } = await axiosInstance.get<GetFollowersResponse>(
      API_ENDPOINTS.PROFILE.GET_FOLLOWERS(accountname),
      { params: { limit, skip } },
    );
    return data.follower || [];
  },

  followUser: async (accountname: string): Promise<UserWithIsFollow> => {
    const { data } = await axiosInstance.post<FollowUserResponse>(
      API_ENDPOINTS.PROFILE.FOLLOW(accountname),
    );
    return data.profile;
  },

  unfollowUser: async (accountname: string): Promise<UserWithIsFollow> => {
    const { data } = await axiosInstance.delete<UnfollowUserResponse>(
      API_ENDPOINTS.PROFILE.UNFOLLOW(accountname),
    );
    return data.profile;
  },

  // SWAGGER에는 PROFILE이 아니라 USER
  updateProfile: async (userInfo: UpdateProfileRequest): Promise<User> => {
    const { data } = await axiosInstance.put<User>(API_ENDPOINTS.USER.UPDATE_PROFILE, userInfo);
    return data;
  },
};
