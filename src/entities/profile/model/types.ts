import type { User, UserWithIsFollow } from '@/shared/model';

export interface Profile extends User {
  isfollow: boolean;
}

export interface GetUserProfileResponse {
  profile: Profile;
}

export interface GetFollowersResponse {
  follower: UserWithIsFollow[];
}

export interface GetFollowingsResponse {
  following: UserWithIsFollow[];
}

export interface FollowUserResponse {
  profile: UserWithIsFollow;
}

export interface UnfollowUserResponse {
  profile: UserWithIsFollow;
}

export interface ProfileUpdateRequest {
  user: {
    username: string;
    accountname: string;
    intro: string;
    image: string;
  };
}

export interface ProfileUpdateResponse {
  profile: User;
}

export interface UpdateProfileRequest {
  user: {
    username: string;
    accountname: string;
    intro: string;
    image: string;
  };
}
