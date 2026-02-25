import { z } from 'zod';

export const postFormSchema = z.object({
  content: z
    .string()
    .min(1, '게시글 내용을 입력해주세요.')
    .max(2200, '게시글은 최대 2200자까지 입력 가능합니다.'),
});

export type PostFormData = z.infer<typeof postFormSchema>;
