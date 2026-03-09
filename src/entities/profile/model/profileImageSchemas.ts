import { z } from 'zod';

// 이미지 파일 최대 용량 (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const imageFileSchema = z.object({
  file: z
    .instanceof(File)
    .refine((f) => f.type.startsWith('image/'), {
      message: '이미지 파일만 업로드할 수 있습니다.',
    })
    .refine((f) => f.size <= MAX_FILE_SIZE, {
      message: `이미지는 ${MAX_FILE_SIZE / (1024 * 1024)}MB 이하만 업로드 가능합니다.`,
    })
    .optional(),
});

export type ProductFormData = z.infer<typeof imageFileSchema>;
