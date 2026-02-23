export const authKeys = {
  all: ['auth'] as const,
  session: () => [...authKeys.all, 'session'] as const,
};

export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (limit?: number, skip?: number) => [...postKeys.lists(), { limit, skip }] as const,
  feed: (limit?: number, skip?: number) => [...postKeys.lists(), 'feed', { limit, skip }] as const,
  user: (accountname: string, limit?: number, skip?: number) =>
    [...postKeys.lists(), 'user', { accountname, limit, skip }] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (postId: string) => [...postKeys.details(), postId] as const,
};

export const userKeys = {
  all: ['user'] as const,
  me: () => [...userKeys.all, 'me'] as const,
  search: (keyword: string) => [...userKeys.all, 'search', { keyword }] as const,
};

export const commentKeys = {
  all: ['comments'] as const,
  lists: (postId: string) => [...commentKeys.all, 'list', postId] as const,
  list: (postId: string, limit?: number, skip?: number) =>
    [...commentKeys.lists(postId), { limit, skip }] as const,
};

export const productKeys = {
  all: ['product'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (accountname: string, limit?: number, skip?: number) =>
    [...productKeys.lists(), accountname, limit, skip] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (productId: string) => [...productKeys.details(), productId] as const,
};

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
