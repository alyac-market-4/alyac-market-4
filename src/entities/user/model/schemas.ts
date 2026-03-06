import { z } from 'zod';

export const userSchema = z.object({
  _id: z.string().catch(''),
  username: z.string().catch(''),
  email: z.string().catch(''),
  accountname: z.string().catch(''),
  intro: z.string().catch(''),
  image: z.string().catch(''),
  following: z.array(z.string()).catch([]),
  follower: z.array(z.string()).catch([]),
  followerCount: z.number().catch(0),
  followingCount: z.number().catch(0),
});

const searchUserRawSchema = z.union([
  z.array(userSchema),
  z.object({ users: z.array(userSchema) }),
  z.object({ user: z.array(userSchema) }),
]);

/** 어떤 응답 형태가 오든 User[]로 정규화 */
export const searchUserResponseSchema = searchUserRawSchema.transform((val) => {
  if (Array.isArray(val)) return val;
  if ('users' in val) return val.users;
  return val.user;
});

export type UserSchema = z.infer<typeof userSchema>;
