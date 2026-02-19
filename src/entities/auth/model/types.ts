export interface SignInRequest {
  user: {
    email: string;
    password: string;
  };
}

export interface SignInResponse {
  user: {
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
    accessToken: string;
    refreshToken: string;
  };
}
