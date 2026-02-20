export interface Profile {
  _id: string;
  username: string;
  email: string;
  accountname: string;
  intro: string;
  image: string;
  following: string[];
  follower: string[];
  followerCount: number;
  followingCount: number;
  isfollow: boolean;
}

export interface ProfileResponse {
  profile: Profile;
}
