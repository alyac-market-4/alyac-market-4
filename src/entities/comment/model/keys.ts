export const commentKeys = {
  all: ['comments'] as const,
  lists: (postId: string) => [...commentKeys.all, 'list', postId] as const,
  list: (postId: string, limit?: number, skip?: number) =>
    [...commentKeys.lists(postId), { limit, skip }] as const,
};
