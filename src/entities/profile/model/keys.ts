export const profileKeys = {
  all: ['profile'] as const,
  details: () => [...profileKeys.all, 'detail'] as const,
  detail: (accountname: string) => [...profileKeys.details(), accountname] as const,
  followings: (accountname: string, limit?: number, skip: number = 0) =>
    [...profileKeys.detail(accountname), 'following', { limit, skip }] as const,
  followers: (accountname: string, limit?: number, skip: number = 0) =>
    [...profileKeys.detail(accountname), 'follower', { limit, skip }] as const,
  infiniteFollowings: (accountname: string, limit?: number) =>
    [...profileKeys.detail(accountname), 'following', 'infinite', { limit }] as const,
  infiniteFollowers: (accountname: string, limit?: number) =>
    [...profileKeys.detail(accountname), 'follower', 'infinite', { limit }] as const,
};
