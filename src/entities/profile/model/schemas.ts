import { z } from 'zod';

export const profileSchema = z.object({
  username: z.string().trim().min(1, '사용자 이름을 입력해주세요.'),
  accountname: z
    .string()
    .trim()
    .min(1, '계정 ID를 입력해주세요.')
    .regex(/^[a-zA-Z0-9_.]+$/, '영문, 숫자, 밑줄(_), 마침표(.)만 사용할 수 있습니다.'),
  intro: z.string().max(60, '소개는 최대 60자까지 입력 가능합니다.').optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
