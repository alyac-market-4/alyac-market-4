// src/features/post-create/model/schemas.ts
import { z } from 'zod';

const MAX_CONTENT = 2200;
const MAX_FILES = 3;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const postCreateSchema = z
  .object({
    content: z
      .string()
      .transform((v) => v.trim())
      .refine((v) => v.length <= MAX_CONTENT, {
        message: `게시글은 최대 ${MAX_CONTENT}자까지 입력 가능합니다.`,
      }),
    files: z
      .array(z.instanceof(File))
      .max(MAX_FILES, `이미지는 최대 ${MAX_FILES}개까지 업로드 가능합니다.`)
      .refine((arr) => arr.every((f) => f.type.startsWith('image/')), {
        message: '이미지 파일만 업로드할 수 있습니다.',
      })
      .refine((arr) => arr.every((f) => f.size <= MAX_FILE_SIZE), {
        message: `이미지 파일은 ${Math.floor(MAX_FILE_SIZE / (1024 * 1024))}MB 이하만 업로드 가능합니다.`,
      }),
  })
  .refine((data) => data.content.length > 0 || data.files.length > 0, {
    message: '게시글 내용을 입력해주세요.',
    path: ['content'],
  });
