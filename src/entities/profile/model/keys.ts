export const profileKeys = {
  all: ['profile'] as const,
  details: () => [...profileKeys.all, 'detail'] as const,
  detail: (accountname: string) => [...profileKeys.details(), accountname] as const,
  friends: (accountname: string) => [...profileKeys.detail(accountname), 'friends'] as const,
  followings: (accountname: string, limit?: number, skip: number = 0) =>
    [...profileKeys.friends(accountname), 'following', { limit, skip }] as const,
  followers: (accountname: string, limit?: number, skip: number = 0) =>
    [...profileKeys.friends(accountname), 'follower', { limit, skip }] as const,
  infiniteFollowings: (accountname: string, limit?: number, skip: number = 0) =>
    [...profileKeys.friends(accountname), 'following', 'infinite', { limit, skip }] as const,
  infiniteFollowers: (accountname: string, limit?: number, skip: number = 0) =>
    [...profileKeys.friends(accountname), 'follower', 'infinite', { limit, skip }] as const,
};
