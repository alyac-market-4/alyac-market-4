export const profileKeys = {
  all: ['profile'] as const,
  details: () => [...profileKeys.all, 'detail'] as const,
  detail: (accountname: string) => [...profileKeys.details(), accountname] as const,
  friends: (accountname: string) => [...profileKeys.detail(accountname), 'friends'] as const,
  followings: (accountname: string, limit?: number, skip?: number) =>
    [...profileKeys.friends(accountname), 'following', { limit, skip }] as const,
  followers: (accountname: string, limit?: number, skip?: number) =>
    [...profileKeys.friends(accountname), 'follower', { limit, skip }] as const,
};
