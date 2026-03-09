export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (limit?: number, skip: number = 0) => [...postKeys.lists(), { limit, skip }] as const,
  feed: (limit?: number, skip: number = 0) =>
    [...postKeys.lists(), 'feed', { limit, skip }] as const,
  user: (accountname: string, limit?: number, skip: number = 0) =>
    [...postKeys.lists(), 'user', { accountname, limit, skip }] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (postId: string) => [...postKeys.details(), postId] as const,
  toggleLike: () => ['posts', 'toggleLike'] as const,
};
