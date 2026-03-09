export const userKeys = {
  all: ['user'] as const,
  me: () => [...userKeys.all, 'me'] as const,
  search: (keyword: string) => [...userKeys.all, 'search', { keyword }] as const,
};
