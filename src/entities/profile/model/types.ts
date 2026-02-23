import type { User } from '@/shared/model';

export interface Profile extends User {
  isfollow: boolean;
}

export interface GetUserProfileResponse {
  profile: Profile;
}

export interface GetFollowersResponse {
  follower: User[];
}

export interface GetFollowingsResponse {
  following: User[];
}

export interface FollowUserResponse {
  profile: User;
}

export interface UnfollowUserResponse {
  profile: User;
}
