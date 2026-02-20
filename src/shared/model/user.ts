export interface UserBase {
  username: string;
  email: string;
  accountname: string;
  intro: string;
  image: string;
}

export interface User extends UserBase {
  _id: string;
  following: string[];
  follower: string[];
  followerCount: number;
  followingCount: number;
}
